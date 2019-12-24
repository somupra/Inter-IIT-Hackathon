from functools import wraps
from django.http import HttpResponseRedirect
from django.contrib import messages


def officials_only(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):

            if request.user.is_official:
                return function(request, *args, **kwargs)
            else:
                messages.error(request, f'You don\'t have official privileges to login to this site, or access the page. Try with an official user account.')
                return HttpResponseRedirect('login')
    return wrap