export default {
    // TODO fix errors in views

    // 'crud.CrudView': {lazy: () => require('./crud/Crud/CrudView').default},
    'form.AutoCompleteFieldView': {lazy: () => require('./form/AutoCompleteField/AutoCompleteFieldView').default},
    'form.ButtonView': {lazy: () => require('./form/Button/ButtonView').default},
    'form.CheckboxFieldView': {lazy: () => require('./form/CheckboxField/CheckboxFieldView').default},
    'form.CheckboxListFieldView': {lazy: () => require('./form/CheckboxListField/CheckboxListFieldView').default},
    'form.DateFieldView': {lazy: () => require('./form/DateField/DateFieldView').default},
    'form.DateTimeFieldView': {lazy: () => require('./form/DateTimeField/DateTimeFieldView').default},
    'form.DropDownFieldView': {lazy: () => require('./form/DropDownField/DropDownFieldView').default},
    'form.FieldLayoutView': {lazy: () => require('./form/FieldLayout/FieldLayoutView').default},
    'form.FieldSetView': {lazy: () => require('./form/FieldSet/FieldSetView').default},
    'form.FieldListView': {lazy: () => require('./form/FieldList/FieldListView').default},
    'form.FieldListItemView': {lazy: () => require('./form/FieldList/FieldListItemView').default},
    // 'form.FileFieldView': {lazy: () => require('./form/FileField/FileFieldView').default},
    // 'form.FileFieldItemView': {lazy: () => require('./form/FileField/FileFieldItemView').default},
    'form.FormView': {lazy: () => require('./form/Form/FormView').default},
    // 'form.HtmlFieldView': {lazy: () => require('./form/HtmlField/HtmlFieldView').default},
    'form.InputFieldView': {lazy: () => require('./form/InputField/InputFieldView').default},
    'form.NumberFieldView': {lazy: () => require('./form/NumberField/NumberFieldView').default},
    'form.PasswordFieldView': {lazy: () => require('./form/PasswordField/PasswordFieldView').default},
    // 'form.RadioListFieldView': {lazy: () => require('./form/RadioListField/RadioListFieldView').default},
    // 'form.RangeFieldView': {lazy: () => require('./form/RangeField/RangeFieldView').default},
    'form.ReCaptchaFieldView': {lazy: () => require('./form/ReCaptchaField/ReCaptchaFieldView').default},
    'form.SliderFieldView': {lazy: () => require('./form/SliderField/SliderFieldView').default},
    // 'form.SwitcherFieldView': {lazy: () => require('./form/SwitcherField/SwitcherFieldView').default},
    'form.TextFieldView': {lazy: () => require('./form/TextField/TextFieldView').default},
    'form.TimeFieldView': {lazy: () => require('./form/TimeField/TimeFieldView').default},
    'format.BooleanFormatterView': {lazy: () => require('./format/BooleanFormatter/BooleanFormatterView').default},
    'format.DefaultFormatterView': {lazy: () => require('./format/DefaultFormatter/DefaultFormatterView').default},
    // 'format.PhotosFormatterView': {lazy: () => require('./format/PhotosFormatter/PhotosFormatterView').default},
    'icon.IconView': {lazy: () => require('./icon/Icon/IconView').default},
    'layout.HeaderView': {lazy: () => require('./layout/Header/HeaderView').default},
    'layout.LoaderView': {lazy: () => require('./layout/Loader/LoaderView').default},
    'layout.NotificationsView': {lazy: () => require('./layout/Notifications/NotificationsItemView').default},
    'layout.NotificationsItemView': {lazy: () => require('./layout/Notifications/NotificationsView').default},
    'layout.TooltipView': {lazy: () => require('./layout/Tooltip/TooltipView').default},
    // 'list.AccordionView': {lazy: () => require('./list/Accordion/AccordionView').default},
    // 'list.ControlsColumnView': {lazy: () => require('./list/ControlsColumnView/ControlsColumnView').default},
    // 'list.CheckboxColumnView': {lazy: () => require('./list/CheckboxColumn/CheckboxColumnView').default},
    // 'list.DetailView': {lazy: () => require('./list/Detail/DetailView').default},
    // 'list.EmptyView': {lazy: () => require('./list/Empty/EmptyView').default},
    // 'list.GridView': {lazy: () => require('./list/Grid/GridView').default},
    // 'list.ListView': {lazy: () => require('./list/List/ListView').default},
    // 'list.ListItemView': {lazy: () => require('./list/List/ListItemView').default},
    // 'list.PaginationButtonView': {lazy: () => require('./list/Pagination/PaginationMoreView').default},
    // 'list.PaginationMoreView': {lazy: () => require('./list/Pagination/PaginationButtonView').default},
    // 'list.PaginationSizeView': {lazy: () => require('./list/PaginationSize/PaginationSizeView').default},
    'modal.ModalView': {lazy: () => require('./modal/Modal/ModalView').default},
    'modal.TwoFactorModalView': {lazy: () => require('./modal/TwoFactorModal/TwoFactorModalView').default},
    'nav.BreadcrumbsView': {lazy: () => require('./nav/Breadcrubms/BreadcrumbsView').default},
    'nav.ControlsView': {lazy: () => require('./nav/Controls/ControlsView').default},
    'nav.NavBarView': {lazy: () => require('./nav/Nav/NavBarView').default},
    'nav.NavButtonView': {lazy: () => require('./nav/Nav/NavButtonView').default},
    'nav.NavIconView': {lazy: () => require('./nav/Nav/NavIconView').default},
    'nav.NavLinkView': {lazy: () => require('./nav/Nav/NavLinkView').default},
    'nav.NavListView': {lazy: () => require('./nav/Nav/NavListView').default},
    'nav.NavTabsView': {lazy: () => require('./nav/Nav/NavTabsView').default},
    'nav.TreeView': {lazy: () => require('./nav/Tree/TreeView').default},
};
