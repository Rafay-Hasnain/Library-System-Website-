from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Borrowed', 'Borrowed'),
    ]

    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Available')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title