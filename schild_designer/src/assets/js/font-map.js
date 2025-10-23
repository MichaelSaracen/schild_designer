export const FontMap = [
    { family: 'California Signature', weight: 400, path: '/fonts/CalifornianSignature/CalifornianSignature.ttf' },
    // === Great Day Personal Use ===
    { family: 'Great Day Personal Use', weight: 400, path: '/fonts/GreatDay/GreatDayPersonalUse.ttf' },
    { family: 'Great Day Personal Use', weight: 700, path: '/fonts/GreatDay/GreatDayBoldPersonalUse.ttf' },

    // === HelloKetta ===
    { family: 'HelloKetta', weight: 400, path: '/fonts/HelloKetta/HelloKetta.ttf' },

    { family: 'HomeVideo', weight: 400, path: '/fonts/HomeVideo/HomeVideo-Regular.ttf' },
    { family: 'HomeVideo', weight: 700, path: '/fonts/HomeVideo/HomeVideo-Bold.ttf' },

    // === Matrixtype ===
    { family: 'Matrixtype', weight: 400, path: '/fonts/Matrixtype/Matrixtype.ttf' }, // optional normal
    { family: 'Matrixtype', weight: 700, path: '/fonts/Matrixtype/Matrixtype-Bold.ttf' },

    // === Queensides ===
    { family: 'Queensides', weight: 300, path: '/fonts/Queensides/Queensides-Light.ttf' },
    { family: 'Queensides', weight: 400, path: '/fonts/Queensides/Queensides-Regular.ttf' },
    { family: 'Queensides', weight: 500, path: '/fonts/Queensides/Queensides-Medium.ttf' },

    // === Tenderness ===
    { family: 'Tenderness', weight: 400, path: '/fonts/Tenderness/Tenderness.ttf' },

    // === Vegur ===
    { family: 'Vegur', weight: 200, path: '/fonts/Vegur/Vegur-Light.ttf' },
    { family: 'Vegur', weight: 400, path: '/fonts/Vegur/Vegur-Regular.ttf' },
    { family: 'Vegur', weight: 700, path: '/fonts/Vegur/Vegur-Bold.ttf' },
];

export function getAvailableFonts() {
    const families = {};
    FontMap.forEach( f => {
        if ( !families[f.family] ) families[f.family] = [];
        families[f.family].push(f.weight);
    })
    return Object.entries(families).map(([family, weights]) => ({ family, weights }) )
}


export function getFontPath( family, weight ) {
    const entry = FontMap.find(
        f => f.family === family && f.weight === weight
    );
    return entry ? entry.path : null;
}
