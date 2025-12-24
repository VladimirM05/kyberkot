""""""

import graphene


class PaginationInput(graphene.InputObjectType):
    """"""

    offset = graphene.Int(default_value=0, required=False)
    limit = graphene.Int(default_value=3, required=False)
