
type BingoCellProps = {
    number?: number;
    title?: string;
    artist?: string;
    url?: string;
};

function BingoCell({ number, title, artist, url }: BingoCellProps) {
    if (number !== undefined) {
        return (
            <div className="border border-gray-300 rounded-lg p-4 hover:bg-pink-100 transition text-center text-sm shadow-md">
                {number}
            </div>
        );
    }

    return (
        <>
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 rounded-lg p-4 hover:bg-pink-100 transition text-center text-sm shadow-md"
        >
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-gray-600">{artist}</div>
        </a>
            </>
    );
}

export default BingoCell;

