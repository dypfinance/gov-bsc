import React, { useState } from "react";
import moment from "moment";
import { NavLink, Route } from "react-router-dom";
import Address from "./address";

import getFormattedNumber from "../functions/get-formatted-number";
import Boxes from "./boxes";
import Skeleton from "@mui/material/Skeleton";
import Error from "../assets/error.svg";
import Fire from "../assets/fire.svg";
import ArrowButton from "../assets/arrowButton.svg";
const { new_governance: governance, reward_token, BigNumber } = window;

const LP_AMPLIFY_FACTOR = 1;

let PoolGroupName = Object.freeze({
  WBNB: "0",
});

const stakingPools = [
  {
    logo: "/images/wbnb_logo.png",
    name: "BNB Pools",
    group_name: PoolGroupName.WBNB,
    pools: [
      "0x537DC4fee298Ea79A7F65676735415f1E2882F92",
      "0x219717BF0bC33b2764A6c1A772F75305458BDA3d",
      "0xD1151a2434931f34bcFA6c27639b67C1A23D93Af",
      "0xed869Ba773c3F1A1adCC87930Ca36eE2dC73435d",
      "0x415B1624710296717FA96cAD84F53454E8F02D18",
    ],
  },
].map((pools) => {
  pools.pools = pools.pools
    .map((p) => p.toLowerCase())
    .sort()
    .join(",");
  return pools;
});

const AddProposal = (props) => {
  let [formState, setFormState] = useState({
    action: "0", // 0 - disburse or burn, 1 - upgrade governance
    stakingPool: stakingPools[0].pools,
    newGovernance: "",
    newQuorum: "",
    newMinBalance: "",
    text: "",
  });

  const setState = (obj) => setFormState({ ...formState, ...obj });
  let { isOwner, connected } = props;
  return (
    <div>
      <div
        className="l-box addProposal"
        style={{ marginTop: connected ? 43 : 0 }}
      >
        <h3 style={{ textAlign: "left" }}>Submit a proposal</h3>
        <form onSubmit={props.onSubmit(formState)}>
          <div>
            <label
              htmlFor="proposal-action"
              style={{ display: "none" }}
            ></label>
            <select
              value={formState.action}
              onChange={(e) => setState({ action: e.target.value })}
              className="form-control"
              id="proposal-action"
            >
              <option value="0">Disburse or Burn</option>
              {isOwner && <option value="1">Upgrade Governance</option>}
              {isOwner && <option value="2">Change Quorum</option>}
              {isOwner && <option value="4">Change Min Balance</option>}
              <option value="3">Other / Free Text</option>
            </select>
          </div>

          {/* <br /> */}
          {["0", "1"].includes(formState.action) && (
            <div className="pt-3">
              <label htmlFor="staking-pool" className="d-flex">
                Select Pool
              </label>
              <select
                className="form-control"
                id="staking-pool"
                value={formState.stakingPool}
                onChange={(e) => setState({ stakingPool: e.target.value })}
              >
                {stakingPools.map((v, i) => (
                  <option value={v.pools} key={i}>
                    {" "}
                    {v.name}{" "}
                  </option>
                ))}
              </select>
            </div>
          )}
          {formState.action == "1" && (
            <div className="pt-3">
              <input
                required
                className="form-control"
                type="text"
                placeholder="New Governance Contract Address"
                value={formState.newGovernance}
                onChange={(e) => setState({ newGovernance: e.target.value })}
              />
            </div>
          )}
          {formState.action == "2" && (
            <div className="pt-3">
              <input
                required
                className="form-control"
                type="number"
                placeholder="New Quorum"
                value={formState.newQuorum}
                onChange={(e) => setState({ newQuorum: e.target.value })}
              />
            </div>
          )}
          {formState.action == "3" && (
            <div className="pt-3">
              <textarea
                style={{ minHeight: "150px" }}
                required
                className="form-control"
                type="text"
                placeholder="Enter Proposal Text"
                value={formState.text}
                onChange={(e) => setState({ text: e.target.value })}
              ></textarea>
            </div>
          )}
          {formState.action == "4" && (
            <div className="pt-3">
              <input
                required
                className="form-control"
                type="number"
                placeholder="New Min Balance"
                value={formState.newMinBalance}
                onChange={(e) => setState({ newMinBalance: e.target.value })}
              />
            </div>
          )}
          <div className="pt-3">
            <button className="btn btn-primary btn-block" type="submit">
              SUBMIT PROPOSAL
            </button>
            <small className="form-text text-muted mt-4">
              {/*<i className='fas fa-info-circle'></i> */}Submitting a proposal
              requires a minimum of{" "}
              {(props.MIN_BALANCE_TO_INIT_PROPOSAL / 1e18).toFixed(2)} DYP
              Governance Token Balance.
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProposalCard = (props) => (
  <NavLink to={`/proposals/${props._proposalId}`}>
    <div className="container vault-container d-flex">
      <div className="row vault-row text-start justify-content-between">
        <div
          className="col-sm-8 col-md-8 text-center mb-2 d-flex align-items-center gap-3 justify-content-start"
          style={{ gap: 10 }}
        >
          <img
            className="m-0"
            src={props.vault ? props.vault.logo : "/logo192.png"}
            height="38"
            width="38"
            style={{ objectFit: "contain" }}
          />
          <div
            style={{ whiteSpace: "pre-line", gap: 10 }}
            className="col-sm-3 col-md-12 p-0 d-flex"
          >
            <span className="vault-name text-bold">
              {props.vault ? props.vault.name : "DYP Proposal"}{" "}
            </span>
          </div>
        </div>
        <div className="col-sm-10 text-left actionText">
          {{
            0: "Disburse / Burn",
            1: "Upgrade Governance",
            2: "Change Quorum",
            3: "Other / Free Text",
            4: "Change Min Balance",
          }[props._proposalAction] || ""}
        </div>
        <div className="col-sm-7 text-left ExpireWrapper d-flex justify-content-center">
          <p
            style={{
              fontSize: 12,
              marginBottom: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={Fire} alt="fire" className="mr-0" />
            Expires
          </p>
          <p
            style={{ fontSize: 14, color: "var(--solid-btn-bg)" }}
            className="text-muted small mb-0 d-flex justify-content-center"
          >
            {moment
              .duration(
                props._proposalStartTime * 1e3 +
                  window.config.vote_duration_in_seconds * 1e3 -
                  Date.now()
              )
              .humanize(true)}
          </p>
        </div>{" "}
        <img
          src={ArrowButton}
          alt="arrowbutton"
          style={{ width: 30, margin: 0, position: "relative", right: 12 }}
        />
      </div>
    </div>
  </NavLink>
);

function getVaultByAddress(contract_address) {
  contract_address = contract_address.toLowerCase();
  let v = window.vaults.filter(
    (v) => v.contract_address.toLowerCase() == contract_address.toLowerCase()
  )[0];
  return v;
}

function getPoolForProposal(proposal) {
  let pools = proposal._stakingPool
    .map((p) => p.toLowerCase())
    .sort()
    .join(",");
  let p = stakingPools.filter((p) => p.pools == pools)[0];
  return p;
}

export default class Governance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
      total_proposals: 0,
      isLoading: false,
      is_wallet_connected: false,
      token_balance: "",
      totalDeposited: "",
      lastVotedProposalStartTime: "",
      QUORUM: "",
      MIN_BALANCE_TO_INIT_PROPOSAL: "",
    };
  }

  checkConnection = async () => {
    let test = await window.web3.eth?.getAccounts().then((data) => {
      data.length === 0
        ? this.setState({ is_wallet_connected: false })
        : this.setState({ is_wallet_connected: true });
    });
  };

  refreshProposals = async () => {
    if (this.state.isLoading && this.state.proposals.length > 0) return;
    this.setState({ isLoading: true });

    try {
      let total_proposals = Number(await governance.lastIndex());
      let proposals = this.state.proposals;
      let newProposals = [];
      let newProposals2 = [];

      let step = window.config.max_proposals_per_call;
      for (
        let i = total_proposals - proposals.length;
        i >= Math.max(1, total_proposals - proposals.length - step + 1);
        i--
      ) {
       
        const checkproposal = await this.getProposal(i).then()
        if(checkproposal != undefined) {
            newProposals.push(this.getProposal(i));
        }
        else {
            this.refreshProposals();
        }
         
      }
      newProposals = await Promise.all(newProposals);

      //   newProposals = newProposals.map(p => {
      //       p.vault = getVaultByAddress(p._stakingPool)
      //       return p
      //   })
      newProposals2 = proposals.concat(newProposals);
      this.setState({ total_proposals, isLoading: false });
      this.setState({proposals: newProposals2})
    } finally {
      this.setState({ isLoading: false });
    }
  };
  getProposal = async (_proposalId) => {
    if (this.state.is_wallet_connected === true) {
      let p = await governance.getProposal(_proposalId);
      p.vault = getPoolForProposal(p);
      return p;
    }
  };

  componentDidMount() {
    this.refreshBalance();
    this.checkConnection();
    this.getProposal();
    window._refreshBalInterval = setInterval(this.checkConnection, 500);
    // window._refreshBalInterval = setInterval(this.getProposal, 3000);
    // window._refreshBalInterval = setInterval(this.refreshProposals, 3000);
    window.gRefBalInterval = setInterval(this.refreshBalance, 7e3);
  }

  componentWillUnmount() {
    clearInterval(window.gRefBalInterval);
  }
  async shouldComponentUpdate(nextState) {
    if (nextState.connected !== this.props.connected) {
      await this.refreshProposals();
      return true;
    } else {
      return false;
    }
  }

  handleProposalSubmit = (formState) => (e) => {
    e.preventDefault();
    if (
      Number(this.state.token_balance) <
      1 * this.state.MIN_BALANCE_TO_INIT_PROPOSAL
    ) {
      window.alertify.error("Insufficient Governance Token Balance!");
      return;
    }
    let poolGroupName;

    let poolGroup;
    if (
      (poolGroup = stakingPools.filter((p) => {
        return p.pools == formState.stakingPool;
      })[0])
    ) {
      poolGroupName = poolGroup.group_name;
    }

    if (!poolGroupName) {
      window.alertify.error("Invalid pool selected");
      return;
    }

    if (formState.action == "0") {
      governance.proposeDisburseOrBurn(poolGroupName);
    } else if (formState.action == "1") {
      if (!window.web3.utils.isAddress(formState.newGovernance)) {
        window.alertify.error("Invalid Address!");
        return;
      }
      governance.proposeUpgradeGovernance(
        poolGroupName,
        formState.newGovernance
      );
    } else if (formState.action == "2") {
      let newQuorum = formState.newQuorum;
      if (isNaN(newQuorum * 1)) {
        window.alertify.error("Invalid quorum!");
        return;
      }
      newQuorum = new BigNumber(newQuorum).times(1e18).toFixed(0);
      governance.proposeNewQuorum(newQuorum);
    } else if (formState.action == "3") {
      governance.proposeText(formState.text);
    } else if (formState.action == "4") {
      let newMinBalance = formState.newMinBalance;
      if (isNaN(newMinBalance * 1)) {
        window.alertify.error("Invalid quorum!");
        return;
      }
      newMinBalance = new BigNumber(newMinBalance).times(1e18).toFixed(0);
      governance.proposeNewMinBalanceToInitProposal(newMinBalance);
    }
  };

  refreshBalance = async () => {
    if (this.state.is_wallet_connected === true) {
      let coinbase = await window.getCoinbase();
      this.setState({ coinbase });
      try {
        let _rBal = reward_token.balanceOf(coinbase);

        let _totalDeposited = governance.totalDepositedTokens(coinbase);
        let _lvsTime = governance.lastVotedProposalStartTime(coinbase);
        let _q = governance.QUORUM();
        let _m = governance.MIN_BALANCE_TO_INIT_PROPOSAL();

        let [
          token_balance,
          totalDeposited,
          lastVotedProposalStartTime,
          QUORUM,
          MIN_BALANCE_TO_INIT_PROPOSAL,
        ] = await Promise.all([_rBal, _totalDeposited, _lvsTime, _q, _m]);

        this.setState({
          token_balance,
          totalDeposited,
          lastVotedProposalStartTime,
          QUORUM,
          MIN_BALANCE_TO_INIT_PROPOSAL,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  handleClaim = (e) => {
    e.preventDefault();
    governance.withdrawAllTokens();
  };

  handleProposals = async (e) => {
    e.preventDefault();
    await this.refreshProposals();
  };

  render() {
    let { totalDeposited } = this.state;
    totalDeposited = getFormattedNumber(totalDeposited / 1e18, 6);

    let canWithdrawAll = false;
    let withdrawableTitleText = "";
    let canWithdrawAllAfter =
      this.state.lastVotedProposalStartTime * 1e3 +
      window.config.vote_duration_in_seconds * 1e3;
    if (Date.now() > canWithdrawAllAfter) {
      canWithdrawAll = true;
    } else if (canWithdrawAllAfter) {
      withdrawableTitleText =
        `You'll be able to withdraw ` +
        moment.duration(canWithdrawAllAfter - Date.now()).humanize(true);
    }

    let isOwner =
      String(this.state.coinbase).toLowerCase() ==
      window.config.admin_address.toLowerCase();
    const deviceWidth = window.innerWidth;
    return (
      <div>
        <div
          className={
            deviceWidth < 500 ? "container-fluid" : "container-fluid p-0"
          }
        >
          <Route exact path="/">
            <div
              className="row pb-5 m-0"
              style={{ flexDirection: "column-reverse" }}
            >
              <div
                className={`col-lg-12 p-0 governanceWrapper ${
                  this.state.proposals.length > 0 && "d-flex flex-wrap"
                }`}
              >
                {this.state.is_wallet_connected === undefined && (
                  <div className="errorWrapper">
                    <img src={Error} alt="error" />
                    <span>
                      You need to connect your wallet in order to see the
                      proposals
                    </span>
                  </div>
                )}
                {/* <h2 className="mb-4 d-flex mt-4">Governance proposals</h2> */}

                {this.state.is_wallet_connected === true ? (
                  this.state.proposals.map((props, i) => (
                    <div className="col-lg-3">
                      <ProposalCard {...props} key={i} />
                    </div>
                  ))
                ) : (
                  <div className="col-lg-12 row justify-content-between p-0 ml-0">
                    <div className="l-box col-lg-3 mt-3">
                      <Skeleton variant="text" /> <br />
                      <Skeleton variant="circular" width={40} height={40} />
                      <br />
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={118}
                      />
                    </div>

                    <div className="l-box col-lg-3 mt-3">
                      <Skeleton variant="text" /> <br />
                      <Skeleton variant="circular" width={40} height={40} />
                      <br />
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={118}
                      />
                    </div>

                    <div className="l-box col-lg-3 mt-3">
                      <Skeleton variant="text" /> <br />
                      <Skeleton variant="circular" width={40} height={40} />
                      <br />
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={118}
                      />
                    </div>
                  </div>
                )}

                <div className="text-center">
                  {this.state.proposals.length < this.state.total_proposals && (
                    <button
                      className="btn btn-primary l-outline-btn bgt"
                      style={{
                        color: "var(--solid-btn-bg)",
                        fontSize: ".8rem",
                        background: "transparent",
                      }}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.refreshProposals();
                      }}
                    >
                      {this.state.isLoading ? "LOADING..." : "LOAD MORE"}
                    </button>
                  )}

                  {!this.state.isLoading && this.state.proposals.length == 0 && (
                    <div className="pt-5">
                      <p>No Proposals to Display</p>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="col-lg-12 p-0"
                id="votingWrapper"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <AddProposal
                  isOwner={isOwner}
                  connected={this.state.is_wallet_connected}
                  MIN_BALANCE_TO_INIT_PROPOSAL={
                    this.state.MIN_BALANCE_TO_INIT_PROPOSAL
                  }
                  onSubmit={this.handleProposalSubmit}
                />
                <div className="l-box col-lg-7 totalVoting">
                  <form className="" onSubmit={this.handleClaim}>
                    <div className="form-group">
                      <label
                        htmlFor="deposit-amount"
                        className="text-left d-block"
                      >
                        Total in voting
                      </label>
                      <div className="row buttonWrapper">
                        <div
                          className="form-row totalVotingButton"
                          style={{
                            maxWidth: 180,
                            width: "100%",
                          }}
                        >
                          <div className="col-12">
                            <p
                              className="form-control  text-right"
                              style={{
                                border: "none",
                                marginBottom: 0,
                                paddingLeft: 0,
                                background: "rgba(82, 168, 164, 0.2)",
                                color: "var(--text-color)",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "1.2rem",
                                  color: "var(--text-color)",
                                }}
                              >
                                {totalDeposited}
                              </span>{" "}
                              <small className="text-bold">DYP</small>
                            </p>
                          </div>
                        </div>

                        <button
                          title={withdrawableTitleText}
                          disabled={!canWithdrawAll}
                          className="btn btn-primary btn-block l-outline-btn withdrawButton"
                          type="submit"
                          style={{ maxWidth: 180 }}
                        >
                          Withdraw all
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Route>
          <Route
            exact
            path="/proposals/:id"
            render={(props) => (
              <ProposalDetails
                refreshBalance={this.refreshBalance}
                {...props}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

class ProposalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      depositAmount: "",
      withdrawAmount: "",
      depositedTokens: "",
      token_balance: "",
      coinbase: "",
      totalDeposited: "",
      option: "1", // 0, 1.  0 = yes/disburse, 1 = no/burn
      lastVotedProposalStartTime: "",
      QUORUM: "",
      MIN_BALANCE_TO_INIT_PROPOSAL: "",
      is_wallet_connected: false,
      is_proposal_executible: false,

      proposal: {},
    };
  }
  componentDidMount() {
    this.refreshBalance();
    this.refreshProposal();
    // this.getProposal()
    this.checkConnection();
    window._refreshBalInterval = setInterval(this.checkConnection, 500);
    window._refreshVoteBalInterval = setInterval(this.refreshBalance, 3000);
  }

  componentWillUnmount() {
    // this.checkConnection();
    clearInterval(window._refreshVoteBalInterval);
  }

  refreshProposal = () => {
    this.getProposal(this.props.match.params.id)
      .then((proposal) => this.setState({ proposal }))
      .catch(console.error);
  };

  getProposal = async (_proposalId) => {
    if (this.state.is_wallet_connected === true) {
      let p = await governance.getProposal(_proposalId);
      p.vault = getPoolForProposal(p);
      return p;
    }
  };

  handleApprove = (e) => {
    e.preventDefault();
    let amount = this.state.depositAmount;
    amount = new BigNumber(amount).times(1e18).toFixed(0);
    reward_token.approve(governance._address, amount);
  };
  handleAddVote = (e) => {
    let amount = this.state.depositAmount;
    amount = new BigNumber(amount).times(1e18).toFixed(0);
    governance.addVotes(this.props.match.params.id, this.state.option, amount);
  };

  handleRemoveVote = (e) => {
    e.preventDefault();
    let amount = this.state.withdrawAmount;
    amount = new BigNumber(amount).times(1e18).toFixed(0);
    governance.removeVotes(this.props.match.params.id, amount);
  };

  handleClaim = (e) => {
    e.preventDefault();
    governance.withdrawAllTokens();
  };

  handleSetMaxDeposit = (e) => {
    e.preventDefault();
    this.setState({
      depositAmount: new BigNumber(this.state.token_balance)
        .div(1e18)
        .toFixed(18),
    });
  };
  handleSetMaxWithdraw = (e) => {
    e.preventDefault();
    this.setState({
      withdrawAmount: new BigNumber(this.state.depositedTokens)
        .div(1e18)
        .toFixed(18),
    });
  };

  checkConnection = async () => {
    let test = await window.web3.eth?.getAccounts().then((data) => {
      data.length === 0
        ? this.setState({ is_wallet_connected: false })
        : this.setState({ is_wallet_connected: true });
    });
  };

  refreshBalance = async () => {
    if (this.state.is_wallet_connected === true) {
      this.refreshProposal();
      this.props.refreshBalance();

      let coinbase = await window.getCoinbase();
      this.setState({ coinbase });
      try {
        let _rBal = reward_token.balanceOf(coinbase);
        let _myVotes = governance.votesForProposalByAddress(
          coinbase,
          this.props.match.params.id
        );
        let _totalDeposited = governance.totalDepositedTokens(coinbase);
        let _option = governance.votedForOption(
          coinbase,
          this.props.match.params.id
        );
        let _lvsTime = governance.lastVotedProposalStartTime(coinbase);
        let _isExecutible = governance.isProposalExecutible(
          this.props.match.params.id
        );
        let _q = governance.QUORUM();
        let _m = governance.MIN_BALANCE_TO_INIT_PROPOSAL();

        let [
          token_balance,
          depositedTokens,
          totalDeposited,
          option,
          lastVotedProposalStartTime,
          is_proposal_executible,
          QUORUM,
          MIN_BALANCE_TO_INIT_PROPOSAL,
        ] = await Promise.all([
          _rBal,
          _myVotes,
          _totalDeposited,
          _option,
          _lvsTime,
          _isExecutible,
          _q,
          _m,
        ]);

        this.setState({
          token_balance,
          depositedTokens,
          totalDeposited,
          lastVotedProposalStartTime,
          QUORUM,
          MIN_BALANCE_TO_INIT_PROPOSAL,
          is_proposal_executible:
            is_proposal_executible &&
            ["0", "1", "2", "4"].includes(this.state.proposal._proposalAction),
        });

        if (this.state.option == "" || Number(depositedTokens) > 0)
          this.setState({ option });
      } catch (e) {
        console.error(e);
      }
    }
  };

  getOptionText = (option) => {
    if (this.state.proposal._proposalAction == "0") {
      return { 0: "DISBURSE", 1: "BURN" }[option];
    }
    return { 0: "YES", 1: "NO" }[option];
  };

  handleSetOption = (option) => {
    if (Number(this.state.depositedTokens) > 0) return;
    this.setState({ option });
    localStorage.setItem(
      "NoVotes",
      getFormattedNumber(this.state.proposal._optionTwoVotes / 1e18, 6)
    );
  };

  handleExecute = () => {
    governance.executeProposal(this.props.match.params.id);
  };

  render() {
    ////
    let id = this.props.match.params.id;

    let { coinbase, token_balance, proposal, totalDeposited, depositedTokens } =
      this.state;

    if (!proposal._proposalId) return "";

    token_balance = getFormattedNumber(token_balance / 1e18, 6);
    totalDeposited = getFormattedNumber(totalDeposited / 1e18, 6);

    let optionOneVotes = proposal._optionOneVotes;
    let optionTwoVotes = proposal._optionTwoVotes;
    let action = proposal._proposalAction;

    let actionText =
      {
        0: "Disburse / Burn",
        1: "Upgrade Governance",
        2: "Change Quorum",
        3: "Other / Free Text",
        4: "Change Min Balance",
      }[action] || "";

    optionOneVotes = getFormattedNumber(optionOneVotes / 1e18, 6);
    optionTwoVotes = getFormattedNumber(optionTwoVotes / 1e18, 6);
    depositedTokens = getFormattedNumber(depositedTokens / 1e18, 6);

    let endsOn =
      proposal._proposalStartTime * 1e3 +
      window.config.vote_duration_in_seconds * 1e3;

    let expires = moment.duration(endsOn - Date.now()).humanize(true);

    let canRemoveVotes = false;

    if (Date.now() < endsOn) {
      canRemoveVotes = true;
    }

    let canWithdrawAll = false;
    let withdrawableTitleText = "";
    let canWithdrawAllAfter =
      this.state.lastVotedProposalStartTime * 1e3 +
      window.config.vote_duration_in_seconds * 1e3;
    if (Date.now() > canWithdrawAllAfter) {
      canWithdrawAll = true;
    } else if (canWithdrawAllAfter) {
      withdrawableTitleText =
        `You'll be able to withdraw ` +
        moment.duration(canWithdrawAllAfter - Date.now()).humanize(true);
    }

    return (
      <div className="token-staking">
        <div className="row justify-content-between">
          <div className="col-lg-5 mt-5 proposalWrapper">
            <div className="row token-staking-form">
              <div className="col-12">
                <div className="l-box">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                      <label
                        htmlFor="deposit-amount"
                        className="d-block text-left"
                      >
                        Add votes
                      </label>
                      <h5
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 20,
                          fontWeight: 600,
                          marginBottom: 20,
                        }}
                      >
                        <img height={38} src={proposal.vault.logo.toString()} />{" "}
                        {proposal.vault.name.toString()}
                      </h5>
                      <div className="input-group ">
                        <input
                          value={
                            Number(this.state.depositAmount) > 0
                              ? this.state.depositAmount * LP_AMPLIFY_FACTOR
                              : this.state.depositAmount
                          }
                          onChange={(e) =>
                            this.setState({
                              depositAmount:
                                Number(e.target.value) > 0
                                  ? e.target.value / LP_AMPLIFY_FACTOR
                                  : e.target.value,
                            })
                          }
                          className="form-control left-radius"
                          placeholder="0"
                          type="text"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary right-radius btn-max l-light-btn"
                            style={{ cursor: "pointer" }}
                            onClick={this.handleSetMaxDeposit}
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div style={{ paddingRight: "0.3rem" }} className="col-6">
                        <button
                          onClick={() => this.handleSetOption("0")}
                          className={`btn btn-block btn-primary l-light-btn ${
                            this.state.option == "0" ? "btn-outline" : ""
                          }`}
                          type="button"
                        >
                          <i
                            className={
                              this.state.option == "0"
                                ? "fas fa-check-square"
                                : "far fa-square"
                            }
                          ></i>{" "}
                          {this.getOptionText("0")}
                        </button>
                      </div>
                      <div style={{ paddingLeft: "0.3rem" }} className="col-6">
                        <button
                          onClick={() => this.handleSetOption("1")}
                          className={`btn btn-block btn-primary l-light-btn ${
                            this.state.option == "1" ? "btn-outline" : ""
                          }`}
                          type="button"
                        >
                          <i
                            className={
                              this.state.option == "1"
                                ? "fas fa-check-square"
                                : "far fa-square"
                            }
                          ></i>{" "}
                          {this.getOptionText("1")}
                        </button>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div style={{ paddingRight: "0.3rem" }} className="col-6">
                        <button
                          onClick={this.handleApprove}
                          className="btn btn-block btn-primary"
                          type="button"
                        >
                          APPROVE
                        </button>
                      </div>
                      <div style={{ paddingLeft: "0.3rem" }} className="col-6">
                        <button
                          disabled={!canRemoveVotes}
                          onClick={this.handleAddVote}
                          className="btn btn-block btn-primary l-outline-btn"
                          type="submit"
                        >
                          ADD VOTES
                        </button>
                      </div>
                    </div>
                    <p
                      style={{ fontSize: ".8rem" }}
                      className="mt-1 text-center mb-0 text-muted mt-3"
                    >
                      {/* Some info text here.<br /> */}
                      Please approve before voting.
                    </p>
                  </form>
                </div>
              </div>
              <div className="col-12">
                <div className="l-box">
                  <form onSubmit={this.handleRemoveVote}>
                    <div className="form-group">
                      <label
                        htmlFor="deposit-amount"
                        className="d-block text-left"
                      >
                        REMOVE VOTES
                      </label>
                      <div className="input-group ">
                        <input
                          value={
                            Number(this.state.withdrawAmount) > 0
                              ? this.state.withdrawAmount * LP_AMPLIFY_FACTOR
                              : this.state.withdrawAmount
                          }
                          onChange={(e) =>
                            this.setState({
                              withdrawAmount:
                                Number(e.target.value) > 0
                                  ? e.target.value / LP_AMPLIFY_FACTOR
                                  : e.target.value,
                            })
                          }
                          className="form-control left-radius"
                          placeholder="0"
                          type="text"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary right-radius btn-max l-light-btn"
                            style={{ cursor: "pointer" }}
                            onClick={this.handleSetMaxWithdraw}
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      disabled={!canRemoveVotes}
                      className="btn btn-primary btn-block l-outline-btn"
                      type="submit"
                    >
                      REMOVE VOTES
                    </button>
                    {/* <p style={{fontSize: '.8rem'}} className='mt-1 text-center'>Some info text here.</p> */}
                  </form>
                </div>
              </div>
              <div className="col-12">
                <div className="l-box">
                  <form onSubmit={this.handleClaim}>
                    <div className="form-group">
                      <label
                        htmlFor="deposit-amount"
                        className="text-left d-block"
                      >
                        Total in voting
                      </label>
                      <div className="row buttonWrapper">
                        <div
                          className="form-row totalVotingButton"
                          style={{
                            maxWidth: 180,
                            width: "100%",
                          }}
                        >
                          <div className="col-12">
                            <p
                              className="form-control  text-right"
                              style={{
                                border: "none",
                                fontSize: "1.2rem",
                                marginBottom: 0,
                                paddingLeft: 0,
                                background: "rgba(82, 168, 164, 0.2)",
                                color: "var(--text-color)",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "1.2rem",
                                  color: "var(--text-color)",
                                }}
                              >
                                {totalDeposited}
                              </span>{" "}
                              <small className="text-bold">DYP</small>
                            </p>
                          </div>
                        </div>

                        <button
                          title={withdrawableTitleText}
                          disabled={!canWithdrawAll}
                          className="btn btn-primary btn-block l-outline-btn withdrawButton"
                          type="submit"
                          style={{ maxWidth: 180 }}
                        >
                          Withdraw all
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 pl-0 mt-4">
            <div className="l-box">
              <div className="table-responsive">
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    padding: ".3rem",
                    display: "flex",
                  }}
                >
                  PROPOSAL DETAILS
                </h3>
                {proposal._proposalAction == "3" && (
                  <p
                    className="l-proposal-text"
                    style={{ whiteSpace: "pre-line", padding: ".3rem" }}
                  >
                    <td colSpan> {proposal._proposalText} </td>
                  </p>
                )}
                <table className="table-stats table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th className="d-flex">Pool</th>
                      <td className="text-right">
                        <strong>
                          {proposal.vault
                            ? proposal.vault.name
                            : "DYP Proposal"}
                        </strong>{" "}
                        <small></small>
                      </td>
                    </tr>
                    <tr>
                      <th className="d-flex">My DYP Balance</th>
                      <td className="text-right">
                        <strong>{token_balance + " DYP"}</strong>{" "}
                        <small></small>
                      </td>
                    </tr>
                    <tr>
                      <th className="d-flex">{`My ${this.getOptionText(
                        this.state.option
                      )} Votes`}</th>
                      <td className="text-right">
                        <strong>{depositedTokens + " DYP"}</strong>{" "}
                        <small></small>
                      </td>
                    </tr>
                    <tr>
                      <th className="d-flex">Proposal Action</th>
                      <td className="text-right">
                        <strong>{actionText}</strong> <small></small>
                      </td>
                    </tr>

                    <tr>
                      <th className="d-flex">Expires</th>
                      <td className="text-right">
                        <strong>{expires}</strong> <small></small>
                      </td>
                    </tr>
                    {proposal._proposalAction == "1" && (
                      <tr>
                        <th className="d-flex">New Gov. Address</th>
                        <td className="text-right">
                          <Address
                            style={{ fontFamily: "monospace" }}
                            a={proposal._newGovernance}
                          />
                        </td>
                      </tr>
                    )}
                    {proposal._proposalAction == "2" && (
                      <tr>
                        <th className="d-flex">New Quorum</th>
                        <td className="text-right">
                          <strong>
                            {getFormattedNumber(proposal._newQuorum / 1e18, 6)}
                          </strong>{" "}
                          <small>DYP</small>
                        </td>
                      </tr>
                    )}
                    {proposal._proposalAction == "4" && (
                      <tr>
                        <th className="d-flex">New Min Balance</th>
                        <td className="text-right">
                          <strong>
                            {getFormattedNumber(
                              proposal._newMinBalance / 1e18,
                              6
                            )}
                          </strong>{" "}
                          <small>DYP</small>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <th className="d-flex">My Address</th>
                      <td className="text-right">
                        <Address
                          style={{ fontFamily: "monospace" }}
                          a={coinbase}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="d-flex">Contract Address</th>
                      <td className="text-right">
                        <Address
                          style={{ fontFamily: "monospace" }}
                          a={governance._address}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th className="d-flex">My DYP Balance</th>
                      <td className="text-right">
                        <strong>{token_balance}</strong> <small>DYP</small>
                      </td>
                    </tr>

                    <tr>
                      <th className="d-flex">
                        {this.getOptionText("0")} Votes{" "}
                      </th>
                      <td className="text-right">
                        <strong>{optionOneVotes}</strong> <small>DYP</small>
                      </td>
                    </tr>

                    <tr>
                      <th className="d-flex">
                        {this.getOptionText("1")} Votes{" "}
                      </th>
                      <td className="text-right">
                        <strong>{optionTwoVotes}</strong> <small>DYP</small>
                      </td>
                    </tr>

                    <tr>
                      <td
                        colSpan="2"
                        className="text-left text-muted small pt-3"
                        style={{ fontSize: ".8rem" }}
                      >
                        Proposals may be executed within{" "}
                        {moment
                          .duration(
                            window.config.execution_allowance_in_seconds * 1e3
                          )
                          .humanize()}{" "}
                        after voting ends. Quorum requirement is a minimum of{" "}
                        {(this.state.QUORUM / 1e18).toFixed(2)} DYP, proposals
                        with winning votes less than QUORUM will not be
                        executed. Disburse proposals will disburse a maximum
                        amount of DYP with a -2.5% Price Impact.
                      </td>
                    </tr>

                    {this.state.is_proposal_executible && (
                      <tr>
                        <td colSpan="2">
                          <button
                            onClick={this.handleExecute}
                            className="btn btn-block btn-primary mt-3"
                            type="button"
                          >
                            EXECUTE PROPOSAL
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
