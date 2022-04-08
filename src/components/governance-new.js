import React, { useState } from 'react'
import moment from 'moment'
import { NavLink, Route } from 'react-router-dom'
import Address from './address'

import getFormattedNumber from '../functions/get-formatted-number'
import Boxes from './boxes'

const {new_governance: governance, reward_token, BigNumber} = window

const LP_AMPLIFY_FACTOR = 1

let PoolGroupName = Object.freeze({
    "WBNB": "0",
    "WETH": "1",
    "BUSD": "2"
})

const stakingPools = [
    {
        logo: '/images/wbnb_logo.png',
        name: "BNB Pools",
        group_name: PoolGroupName.WBNB,
        pools: [
            "0x8A607e099e835BdBc4a606aCb600ef475414F450",
            "0x34Dd0D25FA2E3B220d1eb67460c45e586C61c2bB",
            "0xb07c67b65E6916bA87B6E3fa245aA18F77b4413E",
            "0x52AdFBb5bc9F9Fee825bD56fEB11F1Fc90E0B47E"
        ]
    },
    {
        logo: '/images/ETH.png',
        name: 'ETH pools',
        group_name: PoolGroupName.WETH,
        pools: [
            "0xb4338fC62b1DE93F63bFEDb9Fd9bAC455D50a424",
            "0x2C1411D4F1647B88a7B46c838a3760F925baC83B",
            "0x2c51Df297A2aa972A45eD52110aFD24591c6f302",
            "0xD7180D6fEA393158d42d0d0cD66aB93048F581e3"
        ]
    },
    {
        logo: '/images/BUSD.png',
        name: 'BUSD pools',
        group_name: PoolGroupName.BUSD,
        pools: [
            "0x111AE4CA424036d09B4e0fc9F1de5E6DC90d586b",
            "0x7637fa253180556BA486d2fA5d2BB328EB0AA7Ca",
            "0x2F3C4A08dad0F8a56eDE3961aB654020534B8a8C",
            "0x417538F319AfDDD351f33222592B60f985475A21"
        ]
    }
]
    .map(pools => {
        pools.pools = pools.pools.map(p => p.toLowerCase()).sort().join(',');
        return pools
    })

const AddProposal = (props) => {
    let [formState, setFormState] = useState({
        action: '0', // 0 - disburse or burn, 1 - upgrade governance
        stakingPool: stakingPools[0].pools,
        newGovernance: '',
        newQuorum: '',
        newMinBalance: '',
        text: ''
    })

    const setState = obj => setFormState({...formState, ...obj})
    let { isOwner } = props
    return (
        <div>
            <h3>SUBMIT A PROPOSAL</h3>
            <div className='l-box'>
            <form onSubmit={props.onSubmit(formState)}>
                <div>
                    <label htmlFor='proposal-action'>Select Action</label>
                    <select value={formState.action} onChange={e => setState({ action: e.target.value })} className='form-control' id='proposal-action'>
                        <option value='0'>Disburse or Burn</option>
                        {isOwner && <option value='1'>Upgrade Governance</option>}
                        {isOwner && <option value='2'>Change Quorum</option>}
                        {isOwner && <option value='4'>Change Min Balance</option>}
                        <option value='3'>Other / Free Text</option>
                    </select>
                </div>

                {/* <br /> */}
                {['0', '1'].includes(formState.action) &&  <div className='pt-3'>
                    <label htmlFor='staking-pool'>Select Pool</label>
                    <select className='form-control' id='staking-pool' value={formState.stakingPool} onChange={e => setState({ stakingPool: e.target.value })}>
                        {stakingPools.map((v, i) => <option value={v.pools} key={i}> {v.name} </option>)}
                    </select>
                </div>}
                {formState.action == '1' && <div className='pt-3'>
                    <input required className='form-control' type='text' placeholder='New Governance Contract Address' value={formState.newGovernance} onChange={e => setState({newGovernance: e.target.value})} />
                </div>}
                {formState.action == '2' && <div className='pt-3'>
                    <input required className='form-control' type='number' placeholder='New Quorum' value={formState.newQuorum} onChange={e => setState({ newQuorum: e.target.value })} />
                </div>}
                {formState.action == '3' && <div className='pt-3'>
                    <textarea style={{minHeight: '150px'}} required className='form-control' type='text' placeholder='Enter Proposal Text' value={formState.text} onChange={e => setState({ text: e.target.value })} ></textarea>
                </div>}
                {formState.action == '4' && <div className='pt-3'>
                    <input required className='form-control' type='number' placeholder='New Min Balance' value={formState.newMinBalance} onChange={e => setState({ newMinBalance: e.target.value })} />
                </div>}
                <div className='pt-3'>
                    <button className='btn btn-primary btn-block' type='submit'>SUBMIT PROPOSAL</button>
                    <small className='form-text text-muted mt-4'>{/*<i className='fas fa-info-circle'></i> */}Submitting a proposal requires a minimum of {(props.MIN_BALANCE_TO_INIT_PROPOSAL/1e18).toFixed(2)} DYP Governance Token Balance.</small>
                </div>
            </form>
            </div>
        </div>
    )
}

const ProposalCard = (props) => (
    <NavLink to={`/proposals/${props._proposalId}`}>
        <div className='container vault-container'>
            <div className='row vault-row'>
                <div className='col-sm-2 col-md-1 text-center'>
                    <img className='mb-3' src={props.vault ? props.vault.logo : '/logo192.png'} height='45' width='45' style={{objectFit: 'contain'}} />
                </div>
                <div style={{whiteSpace: 'pre-line'}} className='col-sm-3 col-md-4'>
                    <span className='vault-name text-bold'>{props.vault ? props.vault.name : 'DYP Proposal'} </span>
                </div>
                <div className='col-sm-4 text-muted small'>
                    {({
                        '0': 'Disburse / Burn',
                        '1': 'Upgrade Governance',
                        '2': 'Change Quorum',
                        '3': 'Other / Free Text',
                        '4': 'Change Min Balance'
                    })[props._proposalAction] || ''}
                </div>
                <div className='col-sm-3 text-right'>
                    <h4>Expires</h4>
                    <p className='text-muted small'>{moment.duration(props._proposalStartTime*1e3 + window.config.vote_duration_in_seconds*1e3 - Date.now()).humanize(true)}</p>
                </div>
            </div>
        </div>
    </NavLink>
)

function getVaultByAddress(contract_address) {
    contract_address = contract_address.toLowerCase()
    let v = window.vaults.filter(v => v.contract_address.toLowerCase() == contract_address.toLowerCase())[0]
    return v
}

function getPoolForProposal(proposal) {
    let pools = proposal._stakingPool.map(p => p.toLowerCase()).sort().join(',')
    let p = stakingPools.filter(p => p.pools == pools)[0]
    return p
}

export default class Governance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            proposals: [],
            total_proposals: 0,
            isLoading: true,
            token_balance: '',
            totalDeposited: '',
            lastVotedProposalStartTime: '',
            QUORUM: '',
            MIN_BALANCE_TO_INIT_PROPOSAL: ''
        }
    }

    refreshProposals = async () => {
        if (this.state.isLoading && this.state.proposals.length > 0) return;
        this.setState({isLoading: true})
        try {
            let total_proposals = Number(await governance.lastIndex())
            let proposals = this.state.proposals
            let newProposals = []
            let step = window.config.max_proposals_per_call
            for (let i = total_proposals - proposals.length; i >= Math.max(1, total_proposals - proposals.length - step + 1); i--) {
                newProposals.push(this.getProposal(i))
            }
            newProposals = await Promise.all(newProposals)
            // newProposals = newProposals.map(p => {
            //     p.vault = getVaultByAddress(p._stakingPool)
            //     return p
            // })
            proposals = proposals.concat(newProposals)
            this.setState({total_proposals, proposals, isLoading: false})
        } finally {
            this.setState({isLoading: false})
        }
    }

    getProposal = async (_proposalId) => {
        let p = await governance.getProposal(_proposalId)
        p.vault = getPoolForProposal(p)
        return p
    }

    componentDidMount() {
        this.refreshProposals()
        this.refreshBalance()
        window.gRefBalInterval = setInterval(this.refreshBalance, 7e3)
    }
    componentWillUnmount() {
        clearInterval(window.gRefBalInterval)
    }

    handleProposalSubmit = formState => e => {
        e.preventDefault()
        if (Number(this.state.token_balance) < 1*this.state.MIN_BALANCE_TO_INIT_PROPOSAL) {
            window.alertify.error("Insufficiet Governance Token Balance!")
            return;
        }
        let poolGroupName;

        let poolGroup;
        if (poolGroup = stakingPools.filter(p => {
            return p.pools == formState.stakingPool
        })[0]) {
            poolGroupName = poolGroup.group_name
        }

        if (!poolGroupName) {
            window.alertify.error("Invalid pool selected")
            return
        }

        if (formState.action == '0') {
            governance.proposeDisburseOrBurn(poolGroupName)
        } else if (formState.action == '1') {
            if (!window.web3.utils.isAddress(formState.newGovernance)) {
                window.alertify.error("Invalid Address!");
                return;
            }
            governance.proposeUpgradeGovernance(poolGroupName, formState.newGovernance)
        } else if (formState.action == '2') {
            let newQuorum = formState.newQuorum
            if (isNaN(newQuorum*1)) {
                window.alertify.error("Invalid quorum!")
                return;
            }
            newQuorum = new BigNumber(newQuorum).times(1e18).toFixed(0)
            governance.proposeNewQuorum(newQuorum)
        } else if (formState.action == '3') {
            governance.proposeText(formState.text)
        } else if (formState.action == '4') {
            let newMinBalance = formState.newMinBalance
            if (isNaN(newMinBalance * 1)) {
                window.alertify.error("Invalid quorum!")
                return;
            }
            newMinBalance = new BigNumber(newMinBalance).times(1e18).toFixed(0)
            governance.proposeNewMinBalanceToInitProposal(newMinBalance)
        }
    }

    refreshBalance = async () => {

        let coinbase = await window.getCoinbase()
        this.setState({coinbase})
        try {
            let _rBal = reward_token.balanceOf(coinbase)
            let _totalDeposited = governance.totalDepositedTokens(coinbase)
            let _lvsTime = governance.lastVotedProposalStartTime(coinbase)
            let _q = governance.QUORUM()
            let _m = governance.MIN_BALANCE_TO_INIT_PROPOSAL()

            let [
                token_balance,
                totalDeposited,
                lastVotedProposalStartTime,
                QUORUM,
                MIN_BALANCE_TO_INIT_PROPOSAL
            ] = await Promise.all([ _rBal, _totalDeposited, _lvsTime, _q, _m])

            this.setState({
                token_balance,
                totalDeposited,
                lastVotedProposalStartTime,
                QUORUM,
                MIN_BALANCE_TO_INIT_PROPOSAL
            })


        } catch (e) {
            console.error(e)
        }

    }

    handleClaim = (e) => {
        e.preventDefault()
        governance.withdrawAllTokens()
    }

    render() {

        let {totalDeposited} = this.state
        totalDeposited = getFormattedNumber(totalDeposited/1e18, 6)

        let canWithdrawAll = false
        let withdrawableTitleText = ''
        let canWithdrawAllAfter = this.state.lastVotedProposalStartTime*1e3 + window.config.vote_duration_in_seconds*1e3
        if (Date.now() > canWithdrawAllAfter) {
            canWithdrawAll = true
        } else if (canWithdrawAllAfter) {
            withdrawableTitleText = `You'll be able to withdraw `+moment.duration(canWithdrawAllAfter - Date.now()).humanize(true)
        }

        let isOwner = String(this.state.coinbase).toLowerCase() == window.config.admin_address.toLowerCase()

        return (
            <div>
                <div className='container'>
                    <Route exact path='/'>
                        <div className='row pb-5'>
                            
                            <div className='col-lg-8'>
                                <h3>GOVERNANCE PROPOSALS</h3>
                                {this.state.proposals.map((props, i) => <ProposalCard {...props} key={i} />)}
                                <div className='text-center'>
                                    {this.state.proposals.length < this.state.total_proposals &&
                                    <button className='btn btn-primary l-outline-btn bgt' style={{color: 'var(--solid-btn-bg)', fontSize: '.8rem', background: 'transparent'}} href='#' onClick={e => {
                                        e.preventDefault()
                                        this.refreshProposals()
                                    }}>{this.state.isLoading ? 'LOADING...':'LOAD MORE'}</button>}

                                    {!this.state.isLoading && this.state.proposals.length == 0 &&
                                    <div className='pt-5'>
                                        <p>No Proposals to Display</p>
                                    </div>}
                                </div>

                            </div>
                            <div className='col-lg-4'>
                                <AddProposal isOwner={isOwner} MIN_BALANCE_TO_INIT_PROPOSAL={this.state.MIN_BALANCE_TO_INIT_PROPOSAL} onSubmit={this.handleProposalSubmit} />
                                <div className='l-box'>
                                <form className='' onSubmit={this.handleClaim}>
                                    <div className='form-group'>
                                        <label htmlFor='deposit-amount' className='text-left d-block'>TOTAL IN VOTING</label>
                                        <div className='form-row'>
                                            <div className='col-12'>
                                                <p className='form-control  text-right' style={{border: 'none', marginBottom: 0, paddingLeft: 0,  background: 'transparent', color: 'var(--text-color)'}}><span style={{fontSize: '1.2rem', color: 'var(--text-color)'}}>{totalDeposited}</span> <small className='text-bold'>DYP</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <button title={withdrawableTitleText} disabled={!canWithdrawAll} className='btn btn-primary btn-block l-outline-btn' type='submit'>
                                        WITHDRAW ALL
                                    </button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </Route>
                    <Route exact path='/proposals/:id' render={props => <ProposalDetails refreshBalance={this.refreshBalance} {...props} />} />
                </div>
            </div>
        )
    }
}

class ProposalDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            depositAmount: '',
            withdrawAmount: '',
            depositedTokens: '',
            token_balance: '',
            coinbase: '',
            totalDeposited: '',
            option: '1', // 0, 1.  0 = yes/disburse, 1 = no/burn
            lastVotedProposalStartTime: '',
            QUORUM: '',
            MIN_BALANCE_TO_INIT_PROPOSAL: '',

            is_proposal_executible: false,

            proposal: {

            }
        }
    }
    componentDidMount() {
        this.refreshBalance()
        window._refreshVoteBalInterval = setInterval(this.refreshBalance, 3000)
    }

    componentWillUnmount() {
        clearInterval(window._refreshVoteBalInterval)
    }

    refreshProposal = () => {
        this.getProposal(this.props.match.params.id)
            .then(proposal => this.setState({proposal}))
            .catch(console.error)
    }

    getProposal = async (_proposalId) => {
        let p = await governance.getProposal(_proposalId)
        p.vault = getPoolForProposal(p)
        return p
    }

    handleApprove = (e) => {
        e.preventDefault()
        let amount = this.state.depositAmount
        amount = new BigNumber(amount).times(1e18).toFixed(0)
        reward_token.approve(governance._address, amount)
    }
    handleAddVote = (e) => {
        let amount = this.state.depositAmount
        amount = new BigNumber(amount).times(1e18).toFixed(0)
        governance.addVotes(this.props.match.params.id, this.state.option , amount)
    }

    handleRemoveVote = (e) => {
        e.preventDefault()
        let amount = this.state.withdrawAmount
        amount = new BigNumber(amount).times(1e18).toFixed(0)
        governance.removeVotes(this.props.match.params.id, amount)
    }

    handleClaim = (e) => {
        e.preventDefault()
        governance.withdrawAllTokens()
    }

    handleSetMaxDeposit = (e) => {
        e.preventDefault()
        this.setState({depositAmount: new BigNumber(this.state.token_balance).div(1e18).toFixed(18)})
    }
    handleSetMaxWithdraw = (e) => {
        e.preventDefault()
        this.setState({withdrawAmount: new BigNumber(this.state.depositedTokens).div(1e18).toFixed(18)})
    }


    refreshBalance = async () => {
        this.refreshProposal()
        this.props.refreshBalance()

        let coinbase = await window.getCoinbase()
        this.setState({coinbase})
        try {
            let _rBal = reward_token.balanceOf(coinbase)
            let _myVotes = governance.votesForProposalByAddress(coinbase, this.props.match.params.id)
            let _totalDeposited = governance.totalDepositedTokens(coinbase)
            let _option = governance.votedForOption(coinbase, this.props.match.params.id)
            let _lvsTime = governance.lastVotedProposalStartTime(coinbase)
            let _isExecutible = governance.isProposalExecutible(this.props.match.params.id)
            let _q = governance.QUORUM()
            let _m = governance.MIN_BALANCE_TO_INIT_PROPOSAL()

            let [token_balance, depositedTokens, totalDeposited, option, lastVotedProposalStartTime, is_proposal_executible, QUORUM, MIN_BALANCE_TO_INIT_PROPOSAL] = await Promise.all([ _rBal, _myVotes, _totalDeposited, _option, _lvsTime, _isExecutible, _q, _m])

            this.setState({
                token_balance,
                depositedTokens,
                totalDeposited,
                lastVotedProposalStartTime,
                QUORUM,
                MIN_BALANCE_TO_INIT_PROPOSAL,
                is_proposal_executible: is_proposal_executible && ['0','1','2', '4'].includes(this.state.proposal._proposalAction)
            })

            if (this.state.option == '' || Number(depositedTokens) > 0) this.setState({option})

        } catch (e) {
            console.error(e)
        }


    }

    getOptionText = (option) => {
        if (this.state.proposal._proposalAction == '0') {
            return ({0: 'DISBURSE', 1: 'BURN'})[option]
        }
        return ({0: 'YES', 1: 'NO'})[option]
    }

    handleSetOption = option => {
        if (Number(this.state.depositedTokens) > 0) return;
        this.setState({option})
    }

    handleExecute = () => {
        governance.executeProposal(this.props.match.params.id)
    }

    render() {
        let id =  this.props.match.params.id

        let {coinbase, token_balance, proposal, totalDeposited, depositedTokens} = this.state

        if (!proposal._proposalId) return '';

        token_balance = getFormattedNumber(token_balance/1e18, 6)
        totalDeposited = getFormattedNumber(totalDeposited/1e18, 6)

        let optionOneVotes = proposal._optionOneVotes
        let optionTwoVotes = proposal._optionTwoVotes
        let action = proposal._proposalAction

        let actionText = ({
            '0': 'Disburse / Burn',
            '1': 'Upgrade Governance',
            '2': 'Change Quorum',
            '3': 'Other / Free Text',
            '4': 'Change Min Balance'
        })[action] || ''

        optionOneVotes = getFormattedNumber(optionOneVotes/1e18, 6)
        optionTwoVotes = getFormattedNumber(optionTwoVotes/1e18, 6)
        depositedTokens = getFormattedNumber(depositedTokens/1e18, 6)

        let endsOn = proposal._proposalStartTime*1e3 + window.config.vote_duration_in_seconds*1e3

        let expires = moment.duration(endsOn - Date.now()).humanize(true)

        let canRemoveVotes = false

        if (Date.now() < endsOn) {
            canRemoveVotes = true
        }

        let canWithdrawAll = false
        let withdrawableTitleText = ''
        let canWithdrawAllAfter = this.state.lastVotedProposalStartTime*1e3 + window.config.vote_duration_in_seconds*1e3
        if (Date.now() > canWithdrawAllAfter) {
            canWithdrawAll = true
        } else if (canWithdrawAllAfter) {
            withdrawableTitleText = `You'll be able to withdraw `+moment.duration(canWithdrawAllAfter - Date.now()).humanize(true)
        }

        return (
            <div className='token-staking'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='row token-staking-form'>
                            <div className='col-12'>
                                <div className='l-box'>
                                <form onSubmit={e => e.preventDefault()}>
                                    <div className='form-group'>
                                        <label htmlFor='deposit-amount' className='d-block text-left'>ADD VOTES</label>
                                        <div className='input-group '>
                                            <input value={Number(this.state.depositAmount)>0?this.state.depositAmount*LP_AMPLIFY_FACTOR:this.state.depositAmount} onChange={e => this.setState({depositAmount: Number(e.target.value) > 0? e.target.value/LP_AMPLIFY_FACTOR : e.target.value})} className='form-control left-radius' placeholder='0' type='text' />
                                            <div className='input-group-append'>
                                                <button className='btn btn-primary right-radius btn-max l-light-btn' style={{cursor: 'pointer'}} onClick={this.handleSetMaxDeposit}>
                                                    MAX
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div style={{paddingRight: '0.3rem'}} className='col-6'>
                                            <button onClick={() => this.handleSetOption('0')} className={`btn btn-block btn-primary l-light-btn ${this.state.option == '0' ? 'btn-outline':''}`} type='button'>
                                                <i className={(this.state.option == '0')?'fas fa-check-square':'far fa-square'}></i> {this.getOptionText('0')}
                                            </button>
                                        </div>
                                        <div style={{paddingLeft: '0.3rem'}} className='col-6'>
                                            <button onClick={() => this.handleSetOption('1')} className={`btn btn-block btn-primary l-light-btn ${this.state.option == '1' ? 'btn-outline':''}`} type='button'>
                                                <i className={(this.state.option == '1')?'fas fa-check-square':'far fa-square'}></i> {this.getOptionText('1')}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div style={{paddingRight: '0.3rem'}} className='col-6'>
                                            <button onClick={this.handleApprove} className='btn btn-block btn-primary' type='button'>
                                                APPROVE
                                            </button>
                                        </div>
                                        <div style={{paddingLeft: '0.3rem'}} className='col-6'>
                                            <button disabled={!canRemoveVotes} onClick={this.handleAddVote} className='btn btn-block btn-primary l-outline-btn' type='submit'>
                                                ADD VOTES
                                            </button>
                                        </div>
                                    </div>
                                    <p style={{fontSize: '.8rem'}} className='mt-1 text-center mb-0 text-muted mt-3'>
                                        {/* Some info text here.<br /> */}
                                        Please approve before voting.
                                    </p>

                                </form>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='l-box'>
                                <form onSubmit={this.handleRemoveVote}>
                                    <div className='form-group'>
                                        <label htmlFor='deposit-amount' className='d-block text-left'>REMOVE VOTES</label>
                                        <div className='input-group '>
                                            <input value={Number(this.state.withdrawAmount) > 0 ? this.state.withdrawAmount*LP_AMPLIFY_FACTOR:this.state.withdrawAmount} onChange={e => this.setState({withdrawAmount: Number(e.target.value) > 0 ? e.target.value/LP_AMPLIFY_FACTOR : e.target.value})} className='form-control left-radius' placeholder='0' type='text' />
                                            <div className='input-group-append'>
                                                <button className='btn btn-primary right-radius btn-max l-light-btn' style={{cursor: 'pointer'}} onClick={this.handleSetMaxWithdraw}>
                                                    MAX
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button disabled={!canRemoveVotes} className='btn btn-primary btn-block l-outline-btn' type='submit'>
                                        REMOVE VOTES
                                    </button>
                                    {/* <p style={{fontSize: '.8rem'}} className='mt-1 text-center'>Some info text here.</p> */}
                                </form>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='l-box'>
                                <form onSubmit={this.handleClaim}>
                                    <div className='form-group'>
                                        <label htmlFor='deposit-amount' className='text-left d-block'>TOTAL IN VOTING</label>
                                        <div className='form-row'>
                                            <div className='col-12'>
                                                <p className='form-control  text-right' style={{border: 'none', marginBottom: 0, paddingLeft: 0,  background: 'transparent', color: 'var(--text-color)'}}><span style={{fontSize: '1.2rem', color: 'var(--text-color)'}}>{totalDeposited}</span> <small className='text-bold'>DYP</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <button title={withdrawableTitleText} disabled={!canWithdrawAll} className='btn btn-primary btn-block l-outline-btn' type='submit'>
                                        WITHDRAW ALL
                                    </button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <Boxes items={[
                            {
                                title: 'My DYP Balance',
                                number: token_balance + ' DYP',
                            },
                            {
                                title: `My ${this.getOptionText(this.state.option)} Votes`,
                                number: depositedTokens + ' DYP'
                            }
                        ]} />
                        <div className='l-box'>
                        <div className='table-responsive'>
                            <h3 style={{fontSize: '1.1rem', fontWeight: '600', padding: '.3rem'}}>PROPOSAL DETAILS</h3>
                            {
                                proposal._proposalAction == '3' && <p className='l-proposal-text' style={{whiteSpace: 'pre-line', padding: '.3rem'}}>
                                    <td colSpan> {proposal._proposalText} </td>
                                </p>
                            }
                            <table className='table-stats table table-sm table-borderless'>
                                <tbody>

                                <tr>
                                    <th>Pool</th>
                                    <td className="text-right"><strong>{proposal.vault ? proposal.vault.name : 'DYP Proposal'}</strong> <small></small></td>
                                </tr>
                                <tr>
                                    <th>Proposal Action</th>
                                    <td className="text-right"><strong>{actionText}</strong> <small></small></td>
                                </tr>

                                <tr>
                                    <th>Expires</th>
                                    <td className="text-right"><strong>{expires}</strong> <small></small></td>
                                </tr>
                                {proposal._proposalAction == '1' && <tr>
                                    <th>New Gov. Address</th>
                                    <td className='text-right'>
                                        <Address style={{fontFamily: 'monospace'}} a={proposal._newGovernance} />
                                    </td>
                                </tr>}
                                {proposal._proposalAction == '2' && <tr>
                                    <th>New Quorum</th>
                                    <td className='text-right'>
                                        <strong>{getFormattedNumber(proposal._newQuorum/1e18, 6)}</strong> <small>DYP</small>
                                    </td>
                                </tr>}
                                {proposal._proposalAction == '4' && <tr>
                                    <th>New Min Balance</th>
                                    <td className='text-right'>
                                        <strong>{getFormattedNumber(proposal._newMinBalance / 1e18, 6)}</strong> <small>DYP</small>
                                    </td>
                                </tr>}
                                <tr>
                                    <th>My Address</th>
                                    <td className='text-right'>
                                        <Address style={{fontFamily: 'monospace'}} a={coinbase} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Contract Address</th>
                                    <td className='text-right'>
                                        <Address style={{fontFamily: 'monospace'}} a={governance._address} />
                                    </td>
                                </tr>


                                <tr>
                                    <th>My DYP Balance</th>
                                    <td className="text-right"><strong>{token_balance}</strong> <small>DYP</small></td>
                                </tr>

                                <tr>
                                    <th>{this.getOptionText('0')} Votes </th>
                                    <td className="text-right"><strong>{optionOneVotes}</strong> <small>DYP</small></td>
                                </tr>

                                <tr>
                                    <th>{this.getOptionText('1')} Votes </th>
                                    <td className="text-right"><strong>{optionTwoVotes}</strong> <small>DYP</small></td>
                                </tr>

                                <tr>
                                    <th>My {this.getOptionText(this.state.option)} Votes </th>
                                    <td className="text-right"><strong>{depositedTokens}</strong> <small>DYP</small></td>
                                </tr>
                                <tr>
                                    <td colSpan='2' className="text-left text-muted small pt-3" style={{fontSize: '.8rem'}}>Proposals may be executed within {moment.duration(window.config.execution_allowance_in_seconds*1e3).humanize()} after voting ends. Quorum requirement is a minimum of {(this.state.QUORUM/1e18).toFixed(2)} DYP, proposals with winning votes less than QUORUM will not be executed. Disburse proposals will disburse a maximum amount of DYP with a -2.5% Price Impact.</td>
                                </tr>

                                {this.state.is_proposal_executible && <tr>
                                    <td colSpan='2'>
                                        <button onClick={this.handleExecute} className='btn btn-block btn-primary mt-3' type='button'>EXECUTE PROPOSAL</button>
                                    </td>
                                </tr>}

                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}