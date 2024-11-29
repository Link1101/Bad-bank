function AllData(){
    const [data, setData] = React.useState('');

    React.useEffect(() => {

        let req = new Request('/api/all')
        // fetch all accounts from API
        fetch2(req, (data=>{
            console.log(data);
            setData(JSON.stringify(data));
        }))
    }, []);

    return (<>
        <h5>All Data in Store:</h5>
        {data}
    </>);
}
