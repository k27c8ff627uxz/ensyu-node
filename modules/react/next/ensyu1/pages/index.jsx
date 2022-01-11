
function convertDate(date) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`;
}

export const getStaticProps = async (ctx) => {
    console.log(ctx);
    const now = new Date();
    return { props: { initialDate: convertDate(now)} };
}

export default (props) => {
    const now = convertDate(new Date());
    return (<div>
        <div>initialDate: {props.initialDate}</div>
        <div>date: {now}</div>
    </div>);
};
