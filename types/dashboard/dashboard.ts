export type ItemDataProps = {
    id: string;
    title: string;
    urls: {
        regular: string
    };
    alt_description: string
    user: {
        bio: string
    }
};

export type ItemProps = {
    item: ItemDataProps;
    onPress: () => void;
    showDescription: boolean;
};