# Changelog

## v3.0.6 (02.02.2024)

### Fixed

- Правки стилей для возможности выбирать вложенные элементы по клику на лейбл в компоненте 'CheckboxTreeField'

## v3.0.5 (01.02.2024)

### Fixed

- Исправлен UI компонента 'CheckboxTreeField', для отображения чекбоксов только на узлах, не имеющих вложенных элементов

## v3.0.4 (29.01.2024)

### Added

- Добавлено наследование размера полей от размера формы

### Fixed

- Исправлен баг в 'FieldList', при котором обрезались поля, имеющие выпадающий список
- Исправлен баг с пропом 'className' в компоненте 'Header'

## v3.0.3 (24.01.2024)

### Added

- Добавлена обработка свойства ref для SliderView

## v3.0.2 (24.01.2024)

### Added

- Добавлена индикация ошибок для компонентов: 'DropDownField', 'FileField', 'ImageFieldView', 'RadioListField', 'SwitcherField'
- Добавлена индикация ошибки для компонентов: 'CheckboxListField', 'DropDownField', 'FileField', 'ImageFieldView'
- Добавлены классы 'gap-\*'

### Fixed

- Исправлен UI для компонента 'ImageField'

### Removed

- Из зависимостей убран ckeditor, варианты использования 'HtmlField' можно найти на странице компонента

## v3.0.1 (10.01.2024)

### Added

- Добавлена возможность скрывать иконку у 'TreeItem'

### Fixed

- Исправлен баг с выходом за границы экрана компонента 'Calendar' при использовании внутри модального окна

## v3.0.0 (29.12.2023)

### Added

- Добавлен UI для прикрепления файлов при отправке сообщений в компоненте 'Chat'