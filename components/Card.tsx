type CardProps={
    title:string,
    children:string
}

const card = "bg-orange-200 p-3 rounded-md mb-10";

const Card=({title,children}:CardProps)=>{
    return (
        <div className={card}>
        <h1 className="text-lg font-bold">{title}</h1>
        <p>{children}</p>
        </div>
    );
}
export default Card