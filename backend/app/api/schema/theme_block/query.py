import graphene
from api.models import ThemeBlock
from api.schema.theme_block.output import ThemeBlockType

class ThemeBlocksQuery(graphene.ObjectType):
    theme_blocks = graphene.List(
        ThemeBlockType,
        theme_id=graphene.ID(required=True),
    )

    @staticmethod
    def resolve_theme_blocks(_, _info, theme_id):
        return (
            ThemeBlock.objects
            .filter(theme_id=theme_id, is_deleted=False)
            .order_by("order")
        )
