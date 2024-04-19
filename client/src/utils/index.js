// this util func is for geting format date (date,month,year)
export const formatDate = (date) => {
    // Get the month, day, and year
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
};


export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);

    if (isNaN(inputDate)) {
        return "Invalid Date";
    }

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}



// this util func for geting user name letter to show user incon in nav 
export function getInitials(fullName) {
    const names = fullName.split(" ");
    // console.log(names)

    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

    const initialsStr = initials.join("");

    return initialsStr;
}


export const PRIOTITYSTYELS = {
    high: "text-red-600",
    medium: "text-yellow-500",
    normal: "text-sky-400",
    low: "text-green-600",
};


export const TASK_TYPE = {
    todo: "bg-red-500",
    "in progress": "bg-yellow-400",
    completed: "bg-green-600",
};


export const BGS = [
    "bg-blue-600",
    "bg-yellow-500",
    "bg-red-600",
    "bg-green-600",
    "bg-sky-600",
];

export const TaskPriority = {
    low: "low",
    medium: "medium",
    high: "high",
};

