from typing import Union
from django.http import Http404
from rest_framework import viewsets, generics, status, permissions
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser,FormParser
from .models import Menu, Dish, Store, Follow, User, Dish, Comment, Rating, Order, OrderDetail
from .serializers import StoreSerializer, UserSerializer, CommentSerializer, MenuSerializer, DishSerializer,  \
    OrderDetailSerializer, FollowSerializer, OrderSerializer, RatingSerializer, DishDetailSerializer
from .paginator import BasePagination
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
from django.db.models import F


class StoreViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class MenuViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    def retrieve(self, request, pk):
        try:
            menu = Menu.objects.get(pk=pk)

        except Menu.DoesNotExist:
            return Http404()
        return Response(MenuSerializer(menu).data)



class DishViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    serializer_class = DishSerializer
    pagination_class = BasePagination
    parser_classes = [MultiPartParser, FormParser, ]

    def get_queryset(self):
        dishes = Dish.objects.filter()

        q = self.request.query_params.get('q')
        if q is not None:
            dishes = dishes.filter(dish_name=q)

        dish_id = self.request.query_params.get('dish_id')
        if dish_id is not None:
            dishes = dishes.filter(dish_id=dish_id)

        return dishes

    # def retrieve(self, request, pk):
    #     try:
    #         dish = Dish.objects.get(pk=pk)
    #
    #     except Dish.DoesNotExist:
    #         return Http404()
    #     return Response(DishSerializer(dish).data)


    # def get_permissions(self):
    #     if self.action in ['add_comment', 'add_rating']:
    #         return [permissions.IsAuthenticated()]
    #
    #     return [permissions.AllowAny()]
    #
    # @action(methods=['post'], detail=True, url_path='add-comment')
    # def add_comment(self, request, pk):
    #     content = request.data.get('content')
    #     if content:
    #         c = Comment.objects.create(content=content, dish=self.get_object(), creator=request.user)
    #         return Response(CommentSerializer(c, context={"request": request}).data, status=status.HTTP_201_CREATED)
    #
    #     return Response(status=status.HTTP_400_BAD_REQUEST)
    #
    # @action(methods=['post'], detail=True, url_path='rating')
    # def add_rating(self, request, pk):
    #     try:
    #         rate = int(request.data['rating'])
    #     except Union[IndexError, ValueError]:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     else:
    #         r = Rating.objects.update_or_create(defaults={"rate": rate}, creator=request.user, book=self.get_object())
    #
    #         return Response(RatingSerializer(r).data, status=status.HTTP_200_OK)
    #
    # @action(methods=['get'], detail=True, url_path="comments")
    # def get_comments(self, request, pk):
    #     l = self.get_object()
    #     return Response(
    #         CommentSerializer(l.comment_set.order_by("-id").all(), many=True, context={"request": self.request}).data,
    #         status=status.HTTP_200_OK)


class DishDetailViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Dish.objects.filter()
    serializer_class = DishDetailSerializer

    def get_permissions(self):
        if self.action in ['add_comment', 'add_rating']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    def patch_update(self, request ,*args ,**kwargs):
        return super().patch_update(request, *args, **kwargs)

    @action(methods=['post'], detail=True,url_path='add-comment')
    def add_comment(self, request, pk):
        content = request.data.get('content')
        if content:
            c = Comment.objects.create(content=content, dish=self.get_object(), creator=request.user)
            return Response(CommentSerializer(c, context={"request": request}).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path='rating')
    def add_rating(self, request, pk):
        try:
            rate = int(request.data['rating'])
        except Union[IndexError, ValueError]:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            r = Rating.objects.update_or_create(defaults={"rate": rate}, creator=request.user, dish=self.get_object())

            return Response(RatingSerializer(r).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path="comments")
    def get_comments(self, request, pk):
        l = self.get_object()
        return Response(
            CommentSerializer(l.comment_set.order_by("-id").all(), many=True, context={"request": self.request}).data,
            status=status.HTTP_200_OK)


class FollowViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView,generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="current_user")
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)

    def patch_update(self, request, *args, **kwargs):
        if request.user.is_superuser:
            return super().patch_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def patch_update(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().patch_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


class OrderDetailViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
    parser_classes = [MultiPartParser]


class OrderViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action in ['add_order']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['post'], detail=False, url_path="add-order")
    def add_order(self, request):
        order_status = request.data.get('order_status')
        shipping_address = request.data.get('shipping_address')
        price = request.data.get('price')
        shipping_fee = request.data.get('shipping_fee')
        name_receiver = request.data.get('name_receiver')
        phone_receiver = request.data.get('phone_receiver')
        if order_status and price and phone_receiver and shipping_address :
            c = Order.objects.create(order_status=order_status,
                                     shipping_address=shipping_address,
                                     price=price, shipping_fee=shipping_fee,
                                     name_receiver=name_receiver, phone_receiver=phone_receiver,
                                     creator=request.user)

            return Response(OrderSerializer(c, context={"request": request}).data,
                            status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path="add-detail")
    def add_orderdetail(self, request,pk):
        quantity = request.data.get('quantity')
        price = request.data.get('price')
        dish= request.data.get('dish')
        name = request.data.get('name')
        if price and quantity and dish:
            c = OrderDetail.objects.create(quantity=quantity, price=price, dish=dish, name=name,
                                           order=self.get_object())

            return Response(OrderDetailSerializer(c, context={"request": request}).data,
                            status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)