from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    avatar = models.ImageField(upload_to='upload/%Y/%m', null=True)
    # active = models.BooleanField(default=False)


User._meta.get_field('email')._unique = True


class MyModelBase(models.Model):
    subject = models.CharField(max_length=255, null=False)
    image = models.ImageField(upload_to='image/%Y/%m', default=None)
    created_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.subject

    class Meta:
        abstract = True


class Store(models.Model):
    store_name = models.CharField(max_length=200, unique=True)
    store_info = models.TextField(null=True)
    store_image = models.ImageField(upload_to='store/%Y/%m', default=None)
    # follow = models.ManyToManyField(User, related_name="store", blank=True)

    def __str__(self):
        return self.store_name


class Follow(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)


class Menu(models.Model):
    menu_name = models.CharField(max_length=100, null=False, unique=True)
    active = models.BooleanField(default=True)
    menu_image = models.ImageField(upload_to='menu/%Y/%m', default=None)
    store = models.ManyToManyField(Store)
    parent_id = models.IntegerField()
    order = models.IntegerField()

    def __str__(self):
        return self.menu_name


class Dish(models.Model):
    # class Meta:
    #     unique_together = 'book_name'
    #     ordering = ["-id"]

    dish_name = models.CharField(max_length=200, unique=True)
    menu = models.ManyToManyField(Menu)
    dish_info = models.TextField(null=True)
    dish_image = models.ImageField(upload_to='dish/%Y/%m', default=None)
    dish_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    # quantity = models.IntegerField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.dish_name


class Comment(models.Model):
    content = models.TextField()
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class ActionBase(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Action(ActionBase):
    LIKE, HAHA, HEART = range(3)
    ACTIONS = [
        (LIKE, 'like'),
        (HAHA, 'haha'),
        (HEART, 'heart')
    ]
    type = models.PositiveSmallIntegerField(choices=ACTIONS, default=LIKE)


class Rating(ActionBase):
    rate = models.PositiveSmallIntegerField(default=0)


class Order(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.FloatField()
    shipping_fee = models.FloatField()
    shipping_address = models.TextField()
    order_status = models.CharField(max_length=100, null=False)
    phone_receiver = models.CharField(max_length=100, null=False)
    name_receiver = models.CharField(max_length=100, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    note = models.TextField(null=True)

    class Meta:
        ordering = ["-id"]


class OrderDetail(models.Model):
    dish = models.IntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="orders")
    price = models.FloatField()
    quantity = models.IntegerField()
    name = models.TextField()

