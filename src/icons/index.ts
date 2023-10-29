/* eslint-disable import/no-dynamic-require */

export default (customIcons: Record<string, any>) => {
    // All icons
    const icons = {};

    const steroidsIcons = [
        'add',
        'add_square',
        'arrow_down_18x18',
        'arrow_down_24x24',
        'arrow_drop_down_10x10',
        'arrow_left_18x18',
        'arrow_left_24x24',
        'arrow_right_18x18',
        'arrow_right_24x24',
        'arrow_up_18x18',
        'arrow_up_24x24',
        'blank',
        'calendar_check',
        'chart',
        'checkmark_12x12',
        'checkmark_8x8',
        'circle_cross_12x12',
        'circle_cross_16x16',
        'circle_cross_18x18',
        'copy',
        'cross_12x12',
        'cross_8x8',
        'default_16x16',
        'default_24x24',
        'done-all',
        'cut',
        'error_16x16',
        'error_24x24',
        'calendar_range',
        'double_arrow_down',
        'double_arrow_left',
        'double_arrow_right',
        'double_arrow_up',
        'doughnut_chart',
        'edit',
        'expand_down',
        'expand_left',
        'expand_left_double',
        'expand_right',
        'expand_right_double',
        'file_dock',
        'filter',
        'fluid',
        'folder',
        'group',
        'home',
        'img_box',
        'import',
        'info_16x16',
        'info_24x24',
        'loading_purple',
        'loading_default',
        'loading_icon_thick',
        'map',
        'menu_dots',
        'menu_left',
        'minis_sq',
        'paste',
        'pie_chart',
        'pin',
        'sad',
        'search',
        'send',
        'setting_line',
        'share',
        'star',
        'success_16x16',
        'success_24x24',
        'support',
        'trash',
        'upload',
        'user',
        'view_hide',
        'warning_16x16',
        'warning_24x24',
        'clip',
        'view',
        'cross_4x4',
        'expand_up',
        'left_12x12',
        'cancel_ellips',
        'facebook',
        'instagram',
        'telegram',
        'vk',
        'whatsapp',
        'burger',
        'sort',
    ];

    steroidsIcons.forEach(iconName => {
        icons[iconName] = require(`./svgs/${iconName}.svg`);
    });

    return {
        ...icons,
        ...customIcons,
    };
};
