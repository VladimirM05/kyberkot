# pylint: disable=too-few-public-methods
"""Содержит модель блока темы курса."""

from api.models.course_theme import CourseTheme
from django.db import models
from django.db.models import ForeignKey
from django.db.models import TextChoices
from django.utils.translation import gettext_lazy as _


class ThemeBlockType(TextChoices):
    TITLE = "title", _("Заголовок")
    TEXT = "text", _("Текст")
    IMAGE = "image", _("Изображение")

    @classmethod
    def default(cls):
        return cls.TEXT


class ThemeBlock(models.Model):
    """Блок контента внутри темы курса."""

    theme = ForeignKey(
        CourseTheme,
        on_delete=models.CASCADE,
        related_name="blocks",
        verbose_name=_("Тема курса"),
    )

    block_type = models.CharField(
        max_length=32,
        choices=ThemeBlockType.choices,
        default=ThemeBlockType.default(),
        verbose_name=_("Тип блока"),
    )

    title = models.CharField(
        max_length=256,
        null=True,
        blank=True,
        verbose_name=_("Заголовок"),
        help_text=_("Используется для блоков типа 'Заголовок'"),
    )

    text = models.TextField(
        null=True,
        blank=True,
        verbose_name=_("Текст"),
        help_text=_("Используется для текстовых блоков"),
    )

    image = models.ImageField(
        upload_to="course/theme_blocks/",
        null=True,
        blank=True,
        verbose_name=_("Изображение"),
        help_text=_("Используется для блоков с изображением"),
    )

    order = models.PositiveIntegerField(
        verbose_name=_("Порядковый номер"),
    )

    is_deleted = models.BooleanField(
        default=False,
        verbose_name=_("Удален"),
    )
    deleted_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name=_("Дата удаления"),
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Дата обновления"),
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата создания"),
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.theme.name} — {self.block_type} ({self.order})"

    class Meta:
        """Метаданные ThemeBlock."""

        db_table = "theme_block"
        verbose_name = _("Блок темы")
        verbose_name_plural = _("Блоки темы")
        ordering = ("order",)
        indexes = (
            models.Index(fields=("theme", "order"), name="theme_block_order_idx"),
        )
        constraints = (
            models.UniqueConstraint(
                fields=("theme", "order"),
                name="unique_block_order_per_theme",
            ),
        )
