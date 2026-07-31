//this file's purpose: color assignment for tags

const TAG_COLORS = [
    "#FFB3BA",
    "#FFDFBA",
    "#FFFFBA",
    "#BAFFC9",
    "#BAE1FF",
    "#E8AEFF",
    "#FFC6FF",
    "#B5EAD7",
    "#FFDAC1",
    "#E2F0CB",
    "#C7CEEA",
    "#F8C8DC",
    "#D4A5A5",
    "#99B898",
    "#FECEAB",
];

export function getTagColor(tagName: string) {
    let hash = 0;

    for (let i = 0; i < tagName.length; i++) {
        hash += tagName.charCodeAt(i);
    }

    return TAG_COLORS[hash % TAG_COLORS.length];
}