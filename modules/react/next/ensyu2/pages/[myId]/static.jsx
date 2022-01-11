import { useRouter } from 'next/router';

export async function getStaticPaths() {
    console.log('getStaticPaths is called!!!');
    const paths = [
        { params: { myId: 'special_page' } },
    ];
    return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
    console.log('getStaticProps is called!!!');
    console.log(ctx);
    return { props: { id: ctx.params.myId } };
}

export default (props) => {
    const router = useRouter()
    return (<div>
        Hello, { router.query.myId }
    </div>)
}
