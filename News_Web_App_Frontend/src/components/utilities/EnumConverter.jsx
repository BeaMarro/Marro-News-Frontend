const EnumConverter = {
    formatEnumToText(value) {
        const words = value.split(/[\s_]+/);
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        return capitalizedWords.join(' ');
    }
}

export default EnumConverter;
