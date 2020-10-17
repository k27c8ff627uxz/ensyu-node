import { useRouter } from 'next/router';

export default (props) => {
    const router = useRouter()
    return (<div>
        Hello, { router.query.myId }
    </div>)
}
