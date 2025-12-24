""""""

import graphene
from django.contrib.auth.models import User
from api.schema.user.output import AuthPayload

class UserQuery(graphene.ObjectType):
    """"""

    authenticate_user = graphene.Field(
        AuthPayload,
        username=graphene.String(required=True),
        password=graphene.String(required=True)
    )

    @staticmethod
    def resolve_authenticate_user(_, _info, username, password):
        """"""
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                return AuthPayload(is_authenticated=True)
        except User.DoesNotExist:
            pass
        return AuthPayload(is_authenticated=False)
