from drf_writable_nested import WritableNestedModelSerializer
from .models import *

class MarkerSerializer(WritableNestedModelSerializer):
    location = serializers.StringRelatedField(allow_null=False)
    
    class Meta:
        model = Marker
        fields = ['location','x', 'y']

class LocationSerializer(WritableNestedModelSerializer):
    markers = MarkerSerializer(many=True, allow_null=True)
    
    class Meta:
        model = 
        fields = ['official', 'area', 'budget_alloc', 'markers']