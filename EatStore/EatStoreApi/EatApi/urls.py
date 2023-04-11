from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views
from django.contrib import admin
from django.urls import path, include

router = DefaultRouter()
router.register("store", views.StoreViewSet, 'store')
router.register("menu", views.MenuViewSet, 'menu')
router.register("dish", views.DishViewSet, 'dish')
router.register("dish",views.DishDetailViewSet,'dish')
router.register("user",views.UserViewSet,'user')
router.register("comments",views.CommentViewSet,'comment')
router.register("orders",views.OrderViewSet,'order')
router.register("order_detail",views.OrderDetailViewSet,'order_detail')
router.register("follow", views.FollowViewSet, 'follow')

urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info/', views.AuthInfo.as_view())
]
