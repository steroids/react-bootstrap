/// <reference types="@steroidsjs/core/index" />

export default {
    'crud.CrudView': {
        lazy: () => require('./crud/Crud/CrudView').default,
    },
    'content.MenuView': {
        lazy: () => require('./content/Menu/MenuView').default,
    },
    'content.MenuItemView': {
        lazy: () => require('./content/Menu/MenuItemView').default,
    },
    'content.DropDownView': {
        lazy: () => require('./content/DropDown/DropDownView').default,
    },
    'content.AlertView': {
        lazy: () => require('./content/Alert/AlertView').default,
    },
    'content.AvatarView': {
        lazy: () => require('./content/Avatar/AvatarView').default,
    },
    'content.AvatarGroupView': {
        lazy: () => require('./content/Avatar/AvatarGroupView').default,
    },
    'content.CalendarView': {
        lazy: () => require('./content/Calendar/CalendarView').default,
    },
    'content.DetailView': {
        lazy: () => require('./content/Detail/DetailView').default,
    },
    'content.IconView': {
        lazy: () => require('./content/Icon/IconView').default,
    },
    'content.BadgeView': {
        lazy: () => require('./content/Badge/BadgeView').default,
    },
    'content.CopyToClipboardView': {
        lazy: () => require('./content/CopyToClipboard/CopyToClipboardView').default,
    },
    'form.AutoCompleteFieldView': {
        lazy: () => require('./form/AutoCompleteField/AutoCompleteFieldView').default,
    },
    'form.ButtonView': {
        lazy: () => require('./form/Button/ButtonView').default,
    },
    'content.CardView': {
        lazy: () => require('./content/Card/CardView').default,
    },
    'content.AccordionView': {
        lazy: () => require('./content/Accordion/AccordionView').default,
    },
    'content.AccordionItemView': {
        lazy: () => require('./content/Accordion/AccordionItemView').default,
    },
    'form.CheckboxFieldView': {
        lazy: () => require('./form/CheckboxField/CheckboxFieldView').default,
    },
    'form.CheckboxListFieldView': {
        lazy: () => require('./form/CheckboxListField/CheckboxListFieldView').default,
    },
    'form.DateFieldView': {
        lazy: () => require('./form/DateField/DateFieldView').default,
    },
    'form.DateRangeFieldView': {
        lazy: () => require('./form/DateRangeField/DateRangeFieldView').default,
    },
    'form.DateTimeFieldView': {
        lazy: () => require('./form/DateTimeField/DateTimeFieldView').default,
    },
    'form.DateTimeRangeFieldView': {
        lazy: () => require('./form/DateTimeRangeField/DateTimeRangeFieldView').default,
    },
    'form.DropDownFieldView': {
        lazy: () => require('./form/DropDownField/DropDownFieldView').default,
    },
    'form.FieldLayoutView': {
        lazy: () => require('./form/FieldLayout/FieldLayoutView').default,
    },
    'form.FieldSetView': {
        lazy: () => require('./form/FieldSet/FieldSetView').default,
    },
    'form.FieldListView': {
        lazy: () => require('./form/FieldList/FieldListView').default,
    },
    'form.FieldListItemView': {
        lazy: () => require('./form/FieldList/FieldListItemView').default,
    },
    'form.FileFieldView': {
        lazy: () => require('./form/FileField/FileFieldView').default,
    },
    'form.FileFieldItemView': {
        lazy: () => require('./form/FileField/FileFieldItemView').default,
    },
    'form.FormView': {
        lazy: () => require('./form/Form/FormView').default,
    },
    'form.HtmlFieldView': {
        lazy: () => require('./form/HtmlField/HtmlFieldView').default,
    },
    'form.ImageFieldView': {
        lazy: () => require('./form/ImageField/ImageFieldView').default,
    },
    'form.ImageFieldModalView': {
        lazy: () => require('./form/ImageField/ImageFieldModalView').default,
    },
    'form.InputFieldView': {
        lazy: () => require('./form/InputField/InputFieldView').default,
    },
    'form.NumberFieldView': {
        lazy: () => require('./form/NumberField/NumberFieldView').default,
    },
    'form.PasswordFieldView': {
        lazy: () => require('./form/PasswordField/PasswordFieldView').default,
    },
    'form.RadioListFieldView': {
        lazy: () => require('./form/RadioListField/RadioListFieldView').default,
    },
    'form.RateFieldView': {
        lazy: () => require('./form/RateField/RateFieldView').default,
    },
    'form.ReCaptchaFieldView': {
        lazy: () => require('./form/ReCaptchaField/ReCaptchaFieldView').default,
    },
    'form.SliderFieldView': {
        lazy: () => require('./form/SliderField/SliderFieldView').default,
    },
    'form.SwitcherFieldView': {
        lazy: () => require('./form/SwitcherField/SwitcherFieldView').default,
    },
    'form.TextFieldView': {
        lazy: () => require('./form/TextField/TextFieldView').default,
    },
    'form.TimeFieldView': {
        lazy: () => require('./form/TimeField/TimeFieldView').default,
    },
    'format.BooleanFormatterView': {
        lazy: () => require('./format/BooleanFormatter/BooleanFormatterView').default,
    },
    'format.DefaultFormatterView': {
        lazy: () => require('./format/DefaultFormatter/DefaultFormatterView').default,
    },
    'layout.HeaderView': {
        lazy: () => require('./layout/Header/HeaderView').default,
    },
    'layout.LoaderView': {
        lazy: () => require('./layout/Loader/LoaderView').default,
    },
    'layout.NotificationsView': {
        lazy: () => require('./layout/Notifications/NotificationsView').default,
    },
    'layout.NotificationsItemView': {
        lazy: () => require('./layout/Notifications/NotificationsItemView').default,
    },
    'layout.LineProgressBarView': {
        lazy: () => require('./layout/ProgressBar/LineProgressBarView').default,
    },
    'layout.CircleProgressBarView': {
        lazy: () => require('./layout/ProgressBar/CircleProgressBarView').default,
    },
    'layout.SkeletonView': {
        lazy: () => require('./layout/Skeleton/SkeletonView').default,
    },
    'layout.TooltipView': {
        lazy: () => require('./layout/Tooltip/TooltipView').default,
    },
    'list.ControlsColumnView': {
        lazy: () => require('./list/ControlsColumnView/ControlsColumnView').default,
    },
    'list.CheckboxColumnView': {
        lazy: () => require('./list/CheckboxColumn/CheckboxColumnView').default,
    },
    'list.EmptyView': {
        lazy: () => require('./list/Empty/EmptyView').default,
    },
    'list.GridView': {
        lazy: () => require('./list/Grid/GridView').default,
    },
    'list.FlexGridView': {
        lazy: () => require('./list/FlexGrid/FlexGridView').default,
    },
    'list.ContentColumnView': {
        lazy: () => require('./list/Grid/views/ContentColumnView/ContentColumnView').default,
    },
    'list.ListView': {
        lazy: () => require('./list/List/ListView').default,
    },
    'list.ListItemView': {
        lazy: () => require('./list/List/ListItemView').default,
    },
    'list.PaginationButtonView': {
        lazy: () => require('./list/Pagination/PaginationButtonView').default,
    },
    'list.PaginationMoreView': {
        lazy: () => require('./list/Pagination/PaginationMoreView').default,
    },
    'list.PaginationSizeView': {
        lazy: () => require('./list/PaginationSize/PaginationSizeView').default,
    },
    'list.StepsView': {
        lazy: () => require('./list/Steps/StepsView').default,
    },
    'list.StepItemView': {
        lazy: () => require('./list/Steps/StepItemView').default,
    },
    'modal.ModalView': {
        lazy: () => require('./modal/Modal/ModalView').default,
    },
    'modal.TwoFactorModalView': {
        lazy: () => require('./modal/TwoFactorModal/TwoFactorModalView').default,
    },
    'nav.BreadcrumbsView': {
        lazy: () => require('./nav/Breadcrubms/BreadcrumbsView').default,
    },
    'nav.ControlsView': {
        lazy: () => require('./nav/Controls/ControlsView').default,
    },
    'nav.NavBarView': {
        lazy: () => require('./nav/Nav/NavBarView').default,
    },
    'nav.NavButtonView': {
        lazy: () => require('./nav/Nav/NavButtonView').default,
    },
    'nav.NavIconView': {
        lazy: () => require('./nav/Nav/NavIconView').default,
    },
    'nav.NavLinkView': {
        lazy: () => require('./nav/Nav/NavLinkView').default,
    },
    'nav.NavListView': {
        lazy: () => require('./nav/Nav/NavListView').default,
    },
    'nav.NavTabsView': {
        lazy: () => require('./nav/Nav/NavTabsView').default,
    },
    'nav.TreeView': {
        lazy: () => require('./nav/Tree/TreeView').default,
    },
    'nav.ButtonGroupView': {
        lazy: () => require('./nav/ButtonGroup/ButtonGroupView').default,
    },
    'typography.TextView': {
        lazy: () => require('./typography/Text/TextView').default,
    },
    'typography.TitleView': {
        lazy: () => require('./typography/Title/TitleView').default,
    },
};
