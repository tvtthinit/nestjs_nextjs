export function formatDate(value: string): string {
    if (!value) return "";

    const date = new Date(value);

    // Adjust to Vietnam timezone (UTC+7)
    const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Ho_Chi_Minh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };

    // Get parts separately
    const parts = new Intl.DateTimeFormat("vi-VN", options).formatToParts(date);

    const day = parts.find(p => p.type === "day")?.value;
    const month = parts.find(p => p.type === "month")?.value;
    const year = parts.find(p => p.type === "year")?.value;
    const hour = parts.find(p => p.type === "hour")?.value;
    const minute = parts.find(p => p.type === "minute")?.value;

    return `${day}/${month}/${year} ${hour}:${minute}`;
}