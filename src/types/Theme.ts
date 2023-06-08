type ThemeMode = "dark"|"light";

enum Color{
    DARK_GREY= '#252526',
    LIGHT_WHITE = '#fafafa',
    MUSTARD = '#e1ad01',
    YELLOW = '#ffff00',
    BLACK = '#000000',
    WHITE = '#ffffff'
}

interface Theme{
    '--primary': Color;
    '--secondary': Color;
    '--background': Color;
}

const THEMES: Record<ThemeMode, Theme> = {
    light:{
        '--primary':Color.BLACK,
        '--secondary':Color.MUSTARD,
        '--background':Color.LIGHT_WHITE,
    },
    dark:{
        '--primary':Color.WHITE,
        '--secondary':Color.YELLOW,
        '--background':Color.DARK_GREY,
    }
}

export {ThemeMode, Theme, THEMES}