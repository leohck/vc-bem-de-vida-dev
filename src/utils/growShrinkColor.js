export default function growShrinkColor(value, type, gray, reverse) {
    if (gray) {
        return type === 'bg'
            ? 'bg-gray-100 dark:bg-gray-500/20 dark:text-gray-100'
            : 'text-gray-600 dark:text-gray-400'
    }

    if (reverse) {
        value = value * -1
    }

    if (value > 0) {
        return type === 'bg'
            ? 'bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100'
            : 'text-emerald-600 dark:text-emerald-400'
    }

    if (value < 0) {
        return type === 'bg'
            ? 'bg-red-100 dark:bg-red-500/20 dark:text-red-100'
            : 'text-red-600 dark:text-red-500'
    }

    if (value === 0 ) {
        return type === 'bg'
            ? 'bg-gray-100 dark:bg-gray-500/20 dark:text-gray-100'
            : 'text-gray-600 dark:text-gray-400'
    }

    return ''
}
