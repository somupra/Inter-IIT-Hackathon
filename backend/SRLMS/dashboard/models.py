from django.db import models
from authentication.models import User


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authored_posts')
    image = models.ImageField(upload_to='images', default=None)

    def __str__(self):
        return '{} Post'.format(self.author)

