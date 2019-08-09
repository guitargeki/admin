export default {
    colors: {
        text: '#000',
        background: '#EEEEEE',
        primary: '#E54B4B',
        secondary: '#30c',
        muted: '#f6f6f9',
        gray: '#dddddf'
    },
    fonts: {
        body: 'system-ui, sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace'
    },
    fontSizes: {
        none: 0,
        xs: '0.75em',
        s: '0.875em',
        m: '1em',
        l: '1.25em',
        xl: '1.5em'
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25
    },
    space: {
        none: 0,
        xs: '0.25em',
        s: '0.5em',
        m: '1em',
        l: '2em',
        xl: '4em'
    },
    sizes: {
        avatar: 48,
        tableMinHeight: '10em'
    },
    borders: {
        'default': '1px solid rgba(0, 0, 0, 0.2)'
    },
    radii: {
        xs: '0.25em',
        s: '0.5em',
        m: '1em',
        l: '2em',
        xl: '4em',
        circle: 99999
    },
    shadows: [
        0,
        '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
        '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)',
        '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
        '0 12px 17px 2px rgba(0,0,0,0.14), 0 5px 22px 4px rgba(0,0,0,0.12), 0 7px 8px -4px rgba(0,0,0,0.20)',
        '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.20)'
    ],
    zIndices: {
        'dimmer': 10,
        'loader': 20
    },
    // rebass variants
    text: {
        heading: {
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontWeight: 'heading'
        },
        display: {
            fontFamily: 'heading',
            fontWeight: 'heading',
            lineHeight: 'heading',
            fontSize: [5, 6, 7]
        },
        caps: {
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
        }
    },
    variants: {
        avatar: {
            width: 'avatar',
            height: 'avatar',
            borderRadius: 'circle'
        },
        card: {
            p: 2,
            bg: 'background',
            boxShadow: 'card'
        },
        link: {
            color: 'primary'
        },
        nav: {
            fontSize: 1,
            fontWeight: 'bold',
            display: 'inline-block',
            p: 2,
            color: 'inherit',
            textDecoration: 'none',
            ':hover,:focus,.active': {
                color: 'primary'
            }
        }
    },
    buttons: {
        primary: {
            fontSize: 2,
            fontWeight: 'bold',
            color: 'background',
            bg: 'primary',
            borderRadius: 'default'
        },
        outline: {
            variant: 'buttons.primary',
            color: 'primary',
            bg: 'transparent',
            boxShadow: 'inset 0 0 2px'
        },
        secondary: {
            variant: 'buttons.primary',
            color: 'background',
            bg: 'secondary'
        }
    },
    styles: {
        root: {
            fontFamily: 'body',
            fontWeight: 'body',
            lineHeight: 'body'
        }
    }
};