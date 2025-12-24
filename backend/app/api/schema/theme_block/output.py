from graphene_django import DjangoObjectType
from api.models import ThemeBlock

class ThemeBlockType(DjangoObjectType):
    class Meta:
        model = ThemeBlock
        fields = (
            "id",
            "block_type",
            "title",
            "text",
            "image",
            "order",
            "created_at",
        )
