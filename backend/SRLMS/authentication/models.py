from django.db import models
from django.contrib.auth.models import AbstractUser


"""
The user model for Swagrader, new attributes may be added later to the model. 
"""
class User(AbstractUser):
    # Some base properties may be added later
    spams = models.IntegerField(default=0)
    
    def __str__(self):
        name = ""
        if len(self.get_full_name()) == 0:
            name = self.username
        else:
            name = self.get_full_name()
        return name