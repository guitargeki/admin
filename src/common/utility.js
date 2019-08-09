export function getFriendlyColumnName(column) {
    return column.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}