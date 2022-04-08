import React from 'react'
import { NavLink } from 'react-router-dom'

const VaultCard = ({logo, link, name, description, return_heading, return_description}) => (
    <NavLink to={link}>
        <div className='container vault-container'>
            <div className='row vault-row'>
                <div className='col-sm-2 col-md-1 text-center'>
                    <img className='mb-3' src={logo} height='45' width='45' style={{objectFit: 'contain'}} />
                </div>
                <div style={{whiteSpace: 'pre-line'}} className='col-sm-3 col-md-4'>
                    <span className='vault-name'>{name} </span>
                </div>
                <div className='col-sm-4'>
                    {description}
                </div>
                <div className='col-sm-3 text-right'>
                    <h4>{return_heading}</h4>
                    <p>{return_description} </p>
                </div>
            </div>
        </div>
    </NavLink>
)

let vaults = window.vaults

export default class VaultList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <div style={{background: 'white'}}>
                    <div className="container mr-0 ml-0" style={{maxWidth: '100%'}}>
                        <div className="row">
                            <div className="col-md-7 mt-3 mb-3 logo-column">
                                <h2  className='container text-left' style={{position: 'relative', maxWidth: '100%'}}>
                                    <a href='https://dyp.finance/#/earn'>
                                        <img style={{position: 'relative', maxWidth: '90%', objectFit: 'contain', paddingRight: '10px', height: '100px'}} alt='Staking DAPP' src='/logo192.png'
                                             height='125'/>
                                        {' '}DYP
                                    </a> Staking dApp
                                </h2>
                            </div>
                            <div className="col-md-5 mt-3 mb-3 pr-0 pl-0" id="infoPool">
                                <div className="sc-eilVRo jaXjyZ">
                                    <div className="sc-eerKOB bKbMab"><span className="sc-jzgbtB dwWyiU"></span>
                                        <div className="sc-bnXvFD bcIrBV">
                                            <button id="connect-wallet"
                                                    className="sc-gqjmRU gacWOr sc-iAyFgw sc-jWBwVP sc-cMhqgX sc-esOvli iivcTi"><p
                                                className="sc-hMFtBS cxjZDP">Check Security Audit Results</p></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <h3 className='text-center mt-5' style={{fontWeight: 600}}>DYP Staking Pools</h3>
                    <div className='vaults-list'>
                        {vaults.filter(v => !v.hidden).map((props,i) => <VaultCard {...props} key={i} />)}
                    </div>
                </div>
            </div>
        )
    }
}