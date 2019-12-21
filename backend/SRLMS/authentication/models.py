from django.db import models
from django.contrib.auth.models import AbstractUser
from admindb.models import Department

"""
The user model for SRLMS, new attributes may be added later to the model. 
"""
class User(AbstractUser):
    # Some base properties may be added later
    is_official = models.BooleanField(default=False)
    spamcount = models.IntegerField(default=0)
    precision = models.FloatField(default=0.0001)
<<<<<<< HEAD
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, blank=True)
    
=======
    freeze = models.BooleanField(default=False)
    freeze_date = models.DateField(null=True)
    contributions = models.IntegerField(default=0)

>>>>>>> origin/hotfix
    def __str__(self):
        name = ""
        if len(self.get_full_name()) == 0:
            name = self.username
        else:
            name = self.get_full_name()
        return name