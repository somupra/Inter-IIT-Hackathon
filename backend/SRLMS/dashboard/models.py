from django.db import models
from authentication.models import User


class Post(models.Model):
    progress_report = models.BooleanField(default=True) #Is this a progress report of a complaint?
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authored_posts')
    image = models.ImageField(upload_to='images', default=None, null=False)
    description = models.TextField()
    date_posted = models.DateField(auto_now_add = True)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    upvoters = models.ManyToManyField(User, related_name='upvoted_posts')
    downvoters = models.ManyToManyField(User, related_name='downvoted_posts')
    is_resolved = models.BooleanField(default=False)
    x_coordinate = models.FloatField(null=False, blank=False)
    y_coordinate = models.FloatField(null=False, blank=False)
    token = models.CharField(max_length=6, null=False, default='ABCDEF')
    official = models.ManyToManyField(User)
    extended_reports_exists = models.BooleanField(default=False)
    ignored = models.BooleanField(default=False)
    spam = models.BooleanField(default=False)
    was_travelled = models.BooleanField(default=False)

    def __str__(self):
        return '{} Post'.format(self.author)

class ExtendedReport(models.Model):
    parent_report = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authored_ext_posts')
    image = models.ImageField(upload_to='images', default=None, null=False)
    description = models.TextField()
    date_posted = models.DateField(auto_now_add = True)
    is_resolved = models.BooleanField(default=False)

    def __str__(self):
        return '{0} Extended Report by {1}'.format(self.parent_report, self.author)

