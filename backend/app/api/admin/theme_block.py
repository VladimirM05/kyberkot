"""Админка ThemeBlock."""

from django.contrib import admin

from api.models.theme_block import ThemeBlock


@admin.register(ThemeBlock)
class ThemeBlockAdmin(admin.ModelAdmin):
    """Настройка отображения ThemeBlock."""

    list_display = (
        "id",
        "theme",
        "order",
        "block_type",
        "title",
        "text",
    )

    list_filter = (
        "block_type",
        "is_deleted",
        "created_at",
    )

    search_fields = (
        "theme__name",
        "title",
        "text",
    )

    fieldsets = (
        (
            "Основная информация",
            {
                "fields": (
                    "theme",
                    "block_type",
                    "order",
                ),
            },
        ),
        (
            "Контент",
            {
                "fields": (
                    "title",
                    "text",
                    "image",
                ),
            },
        ),
        (
            "Служебная информация",
            {
                "fields": (
                    "is_deleted",
                    "deleted_at",
                    "updated_at",
                    "created_at",
                ),
            },
        ),
    )

    ordering = ("theme", "-order")
    readonly_fields = (
        "id",
        "updated_at",
        "created_at",
        "deleted_at",
    )
