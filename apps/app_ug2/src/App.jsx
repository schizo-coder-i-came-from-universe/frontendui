import 'bootstrap/dist/css/bootstrap.min.css';

import { AppCanvas, createAsyncGraphQLAction, useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared'
// import { AppRouter } from './AppRouter';


export const App = () => {
    return (
        // <Container fluid>
        <AppCanvas>

            
            {/* <Navbar className='bg-light'>
                <Container>
                    <Navbar.Brand href="" className="justify-content-start"><a href='/' className='btn'>UOIS</a></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <LogButton />
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
            <h1>Jak mi dneska zadrbalo na palici!</h1>
            <ul>
            <li>Vstal jsem</li>
            <li>Sel jsem na nastup dopici</li>
            <li>Pak stefek jezisi kriste</li>
            <li> :( </li>
            </ul>
            <p style={{color: "red"}}>A TAK MI JEBLO UZ V DEVET RANO TYKOKOT</p>
            {/* <AppRouter /> */}
        </AppCanvas>    
        // {/* </Container> */}
    )
}

