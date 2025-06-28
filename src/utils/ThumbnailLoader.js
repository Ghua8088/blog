function importAll(r) {
    const images = {};
    r.keys().forEach((key) => {
        const cleanKey = key.replace('./', '');
        images[cleanKey] = r(key);
    });
    return images;
}

export const thumbnails = importAll(
    require.context('../assets/thumbnails', false, /\.(png|jpe?g|svg)$/)
);
