function Main({children}) {
    return (
        <main className="main py-20 md:px-16">
            <div className="user-view"> 
                {children}
            </div> 
        </main>
    )
}

export default Main
