export function createElement(type, cx) {
    const elem = document.createElement(type);

    if (!cx) {
        return elem;
    }

    if (cx.indexOf(',') !== -1) {
        cx.split(',').forEach(cssClass => {
            elem.classList.add(cssClass.trim());
        })
    } else {
        elem.classList.add(cx);
    }

    return elem;
}
