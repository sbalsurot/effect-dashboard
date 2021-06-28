<template>
  <div class="box">
    <h4 class="box-title subtitle">
      Projected Distribution For Cycle {{ curCycleId }}
    </h4>
    <div class="table-container" />
    <table class="table is-fullwidth is-size-6">
      <thead>
        <tr>
          <th>Proposal ID</th>
          <th>Total Vote Weights</th>
          <th>Your Vote Weight</th>
          <th>Projected Result</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proposal in curCycleProposalsDataObj.curCycleProposals" :key="proposal.id">
          <td>{{ proposal.id }}</td>
          <td>{{ (proposal.totalVoteWeight).toLocaleString() }}</td>
          <td>{{ (proposal.yourVoteWeight).toLocaleString() }}</td>
          <td>
            <span v-if="proposal.projectedResult == 0" class="">Abstain (Rejected)</span>
            <span v-if="proposal.projectedResult == 1" class="">Accepted</span>
            <span v-if="proposal.projectedResult == 2" class="">Rejected</span>
          </td>
          <td>{{ (proposal.cost).toLocaleString() }} EFX</td>
        </tr>
      </tbody>
    </table>
    <!--      <pie-chart v-if="!loading" :data="getCombinedVoteWeightsChart" :options="chartOptions" />-->
    <div class="columns balances">
      <div class="column">
        <div class="box">
          <h5 class="box-title subtitle">
            Current DAO Budget
          </h5>
          <div class="has-text-centered">
            <div class="mb-3">
              <div class="is-size-6">
                Total Budget
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curCycleProposalsDataObj.curCycleTotalBudget.toLocaleString() }}<span class="symbol"> EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Expected Proposals Cost
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curCycleProposalsDataObj.totalPassingProposalCost.toLocaleString() }}<span class="symbol"> EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Unused Budget
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curCycleProposalsDataObj.budgetRemaining.toLocaleString() }}<span class="symbol"> EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                30% of Unused Budget For Feepool
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curCycleProposalsDataObj.unusedBudgetFeepool.toLocaleString() }}<span class="symbol"> EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Current Feepool
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curCycleProposalsDataObj.currFeepoolEFX.toLocaleString() }}<span class="symbol"> EFX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <h5 class="box-title subtitle">
            Current DAO Vote Share
          </h5>
          <div class="has-text-centered">
            <div class="mb-3">
              <div class="is-size-6">
                Prev Cycle Avg Total Vote Weights Per Proposal
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ prevCycleProposalsDataObj.avgProposalVoteWeight.toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Cur Cycle Avg Total Vote Weights Per Proposal
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curCycleProposalsDataObj.avgProposalVoteWeight.toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Total Combined Vote Weights
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curCycleProposalsDataObj.totalProposalVoteWeights.toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Your Combined Vote Weights
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curCycleProposalsDataObj.yourTotalProposalVoteWeights.toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Projected Feepool Share
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (curCycleProposalsDataObj.yourProjectedFeepoolShare * 100).toLocaleString() }}<span class="symbol"> %</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Projected Feepool Rewards
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (curCycleProposalsDataObj.yourProjectedFeepoolRewards).toLocaleString() }}<span class="symbol"> EFX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 class="box-title subtitle">
      Custom Rewards Estimator
    </h4>
    <div class="columns balances">
      <div class="column">
        <div class="box">
          <div class="has-text-centered">
            <h5 class="box-title subtitle">
              Current
            </h5>
            <div class="mb-3">
              <div class="is-size-6">
                Staked EFX
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curr_stakeEFX.toLocaleString() }} <span class="symbol"> EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Stake Age
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (curr_stakeAge / (24 * 3600)).toLocaleString() }} <span class="symbol"> Days</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Effect Power
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ curr_EP.toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Staked NFX
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (curr_stakeNFX).toLocaleString() }}<span class="symbol"> NFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Vote Weight
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (curr_voteweight).toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <div class="has-text-centered">
            <h5 class="box-title subtitle">
              After
            </h5>
            <div class="mb-3">
              <div class="is-size-6">
                Staked EFX
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ calc_stakeEFX.toLocaleString() }} <span class="symbol"> EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Stake Age
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (calc_stakeAge).toLocaleString() }} <span class="symbol"> Days</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Effect Power
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ calc_EP.toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Staked NFX
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (calc_stakeNFX).toLocaleString() }}<span class="symbol"> NFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Vote Weight
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (calc_voteweight).toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <div class="has-text-centered">
            <h5 class="box-title subtitle">
              Options
            </h5>
            <div class="mb-3">
              <div class="is-size-6">
                Stake EFX
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <input v-model="custom_stakeEFX" type="text">
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Unstake EFX
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <input v-model="custom_unstakeEFX" type="text">
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Stake NFX
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <input v-model="custom_stakeNFX" type="text">
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Unstake NFX
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <input v-model="custom_unstakeNFX" type="text">
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Custom Stake Age
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <input v-model="custom_stakeAge" type="text">
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Custom Feepool Bonus
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <input v-model="custom_feepool_bonus" type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns custom_rewards_calculation">
      <div class="column">
        <div class="box">
          <div class="has-text-centered">
            <h5 class="box-title subtitle">
              Current
            </h5>
            <div class="mb-3">
              <div class="is-size-6">
                Vote Weight
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (curr_voteweight).toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                <span data-tooltip="Average total vote weights per proposal last cycle, subtracts any votes you have made if any and then adds the vote weight in this calculation." class="is-pulled-right">
                  Adjusted Estimated Avg Proposal Total Vote Weight
                </span>
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (prevCycleProposalsDataObj.avgProposalVoteWeightMinusAccount + curr_voteweight).toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Avg % Share of Proposal
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (curr_voteweight / (prevCycleProposalsDataObj.avgProposalVoteWeightMinusAccount + calc_voteweight)).toLocaleString() * 100 }} <span class="symbol"> %</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Estimated EFX Feepool
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (curCycleProposalsDataObj.unusedBudgetFeepool + custom_feepool_bonus).toLocaleString() }} <span class="symbol"> EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Estimated EFX Governance Reward
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ ((curCycleProposalsDataObj.unusedBudgetFeepool + custom_feepool_bonus) * (curr_voteweight / (prevCycleProposalsDataObj.avgProposalVoteWeightMinusAccount + calc_voteweight))).toLocaleString() }} <span class="symbol"> EFX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <div class="has-text-centered">
            <h5 class="box-title subtitle">
              After
            </h5>
            <div class="mb-3">
              <div class="is-size-6">
                Vote Weight
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (calc_voteweight).toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Adjusted Estimated Avg Proposal Total Vote Weight
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (prevCycleProposalsDataObj.avgProposalVoteWeightMinusAccount + calc_voteweight).toLocaleString() }}
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Avg % Share of Proposal
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (calc_voteweight / (prevCycleProposalsDataObj.avgProposalVoteWeightMinusAccount + calc_voteweight)).toLocaleString() * 100 }} <span class="symbol"> %</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Estimated EFX Feepool
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ (curCycleProposalsDataObj.unusedBudgetFeepool + custom_feepool_bonus).toLocaleString() }} <span class="symbol"> EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">
                Estimated EFX Governance Reward
              </div>
              <div class="subtitle is-5 has-text-weight-semibold">
                {{ ((curCycleProposalsDataObj.unusedBudgetFeepool + custom_feepool_bonus) * (calc_voteweight / (prevCycleProposalsDataObj.avgProposalVoteWeightMinusAccount + calc_voteweight))).toLocaleString() }} <span class="symbol"> EFX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PieChart from '@/components/PieChart.js'

import { Serialize } from 'eosjs'
import Long from 'long'
// import PieChart from '@/components/PieChart.js'

export default {
  components: {
    // PieChart
  },
  data () {
    return {
      loading: true,

      curCycleProposalsDataObj: {
        curCycleProposals: [],
        curCycleTotalBudget: 0,
        totalPassingProposalCost: 0,
        totalProposalVoteWeights: 0,
        yourTotalProposalVoteWeights: 0,
        budgetRemaining: 0,
        unusedBudgetFeepoolPercent: 0.3,
        unusedBudgetFeepool: 0,
        yourProjectedFeepoolRewards: 0,
        yourProjectedFeepoolShare: 0,
        currFeepoolEFX: 0,
        avgProposalVoteWeight: 0,
        avgProposalVoteWeightMinusAccount: 0,
        votersTotalVoteWeights: []
      },
      prevCycleProposalsDataObj: {
        curCycleProposals: [],
        curCycleTotalBudget: 0,
        totalPassingProposalCost: 0,
        totalProposalVoteWeights: 0,
        yourTotalProposalVoteWeights: 0,
        budgetRemaining: 0,
        unusedBudgetFeepoolPercent: 0.3,
        unusedBudgetFeepool: 0,
        yourProjectedFeepoolRewards: 0,
        yourProjectedFeepoolShare: 0,
        currFeepoolEFX: 0,
        avgProposalVoteWeight: 0,
        avgProposalVoteWeightMinusAccount: 0,
        votersTotalVoteWeights: []
      },

      curr_stakeEFX: 0,
      curr_stakeNFX: 0,
      curr_stakeAge: 0,
      curr_EP: 0,
      curr_voteweight: 0,
      curr_prev_rewards_estimate: 0,
      curr_curr_rewards_estimate: 0,

      custom_stakeEFX: '',
      custom_unstakeEFX: '',
      custom_stakeNFX: '',
      custom_unstakeNFX: '',
      custom_stakeAge: '',
      custom_feepool_bonus: '',

      calc_stakeEFX: 0,
      calc_stakeNFX: 0,
      calc_stakeAge: 0,
      calc_EP: 0,
      calc_voteweight: 0,
      calc_prev_rewards_estimate: 0,
      calc_curr_rewards_estimate: 0,

      balances: [],
      claims: {},
      totalFees: null,
      lastCycleTotalFees: null,
      lastCycleTotalWeight: null,
      lastCycleUserWeight: null,
      efxToken: process.env.efxToken,

      chartOptions: { cutoutPercentage: 10 },

      // Testing/Dev
      isTestnet: process.env.eosNodeUrl.includes('kylin'),
      cycleOverride: null,
      accountOverride: null,
      claimOverride: null
    }
  },

  computed: {
    accountName () {
      return (this.accountOverride) ? this.accountOverride : (this.$wallet && this.$wallet.wallet) ? this.$wallet.wallet.auth.accountName : null
    },
    distributionBalances () {
      const tbl = this.balances
      return tbl.reverse() // reverse the temp var instead of the original var
    },
    lastCycleId () {
      return (this.cycleOverride) ? this.cycleOverride : (this.$dao.cycleConfig) ? this.$dao.cycleConfig.id - 1 : null
    },
    curCycleId () {
      return (this.cycleOverride) ? this.cycleOverride : (this.$dao.cycleConfig) ? this.$dao.cycleConfig.id : null
    },
    lastCycleUserFees () {
      return (this.lastCycleTotalFees > 0 && this.lastCycleUserWeight > 0) ? Math.trunc((this.lastCycleTotalFees * 10000) / this.lastCycleTotalWeight) / 10000 * this.lastCycleUserWeight : 0
    },
    lastCycleUserShare () {
      return (this.lastCycleUserFees > 0) ? (this.lastCycleUserWeight / this.lastCycleTotalWeight * 100).toFixed(2) : 0
    },
    canClaim () {
      return (this.claimOverride) ? this.claimOverride : !this.claims[this.lastCycleId] && this.lastCycleUserFees > 0 && isFinite(this.lastCycleUserFees)
    },
    genesisAirdrop () {
      return this.$wallet.genesisAirdrop
    },
    efxStaked () {
      return this.$wallet.efxStaked
    },
    nfxStaked () {
      return this.$wallet.nfxStaked
    },
    stakeAge () {
      return this.$wallet.stakeAge
    },
    power () {
      return this.$wallet.power
    },
    votes () {
      return this.$wallet.calculateVotePower(this.$wallet.power, this.$wallet.nfxStaked)
    },
    getCombinedVoteWeightsChart () {
      const voterLabels = []
      const voterWeights = []

      for (const key in this.votersTotalVoteWeights) {
        voterLabels.push(key)
        voterWeights.push(this.votersTotalVoteWeights[key])
      }

      return {
        datasets: [
          {
            name: 'Voter Combined Weights',
            backgroundColor: ['#0dd925', '#499166', '#fce68d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB', '#7e8a8c'],
            weight: 0.90,
            labels: voterLabels,
            data: voterWeights

          }
        ]
      }
    }
  },

  watch: {
    accountName () {
      this.resetValues()
      this.init()
    },
    lastCycleId () {
      this.resetValues()
      this.init()
    },
    custom_stakeEFX () {
      this.setCalcStakedInfo()
    },
    custom_unstakeEFX () {
      this.setCalcStakedInfo()
    },
    custom_stakeNFX () {
      this.setCalcStakedInfo()
    },
    custom_unstakeNFX () {
      this.setCalcStakedInfo()
    },
    custom_stakeAge () {
      this.setCalcStakedInfo()
    },
    custom_feepool_bonus () {
      this.setCalcStakedInfo()
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      this.loading = true
      if (!this.curCycleId) {
        return
      }

      this.curCycleProposalsDataObj = await this.getCycleProposalsVotingDataObj(this.accountName, this.curCycleId)
      this.prevCycleProposalsDataObj = await this.getCycleProposalsVotingDataObj(this.accountName, this.curCycleId - 1)
      // console.log(this.curCycleProposalsDataObj)
      // console.log(this.prevCycleProposalsDataObj)

      // console.log(this.$wallet.efxStaked)
      // console.log('this.curCycleProposals', this.curCycleProposals)
      this.setCurrStakedInfo()
      this.loading = false
    },
    async getCycleProposalsVotingDataObj (accountName, targetCycleID) {
      const cycleProposalsObj = {
        curCycleProposals: [],
        curCycleTotalBudget: 0,
        totalPassingProposalCost: 0,
        totalProposalVoteWeights: 0,
        yourTotalProposalVoteWeights: 0,
        budgetRemaining: 0,
        unusedBudgetFeepoolPercent: 0.3,
        unusedBudgetFeepool: 0,
        yourProjectedFeepoolRewards: 0,
        yourProjectedFeepoolShare: 0,
        currFeepoolEFX: 0,
        avgProposalVoteWeight: 0,
        avgProposalVoteWeightMinusAccount: 0,
        votersTotalVoteWeights: [],
        cycleID: targetCycleID
      }

      // Get Cycle Budget Data
      const cycleData = await this.$eos.rpc.get_table_rows({
        code: process.env.proposalContract,
        scope: process.env.proposalContract,
        table: 'cycle',
        lower_bound: targetCycleID,
        upper_bound: targetCycleID
      })
      // console.log('cycleData', cycleData)

      try {
        if (cycleData && cycleData.rows.length > 0) {
          const cycleTotalBudgetStr = cycleData.rows[0].budget[0].quantity
          cycleProposalsObj.curCycleTotalBudget = parseFloat(cycleTotalBudgetStr.split(' ', 1)[0])
        }
      } catch (error) { console.log(error) }

      // Get Cycle Proposals Data
      const curCycleProposalData = await this.$eos.rpc.get_table_rows({
        code: process.env.proposalContract,
        scope: process.env.proposalContract,
        table: 'proposal',
        key_type: 'i64',
        index_position: 3,
        lower_bound: targetCycleID,
        upper_bound: targetCycleID
      })
      // console.log('curCycleProposalData', curCycleProposalData)

      const proposals = []
      for (const proposal of curCycleProposalData.rows) {
        const proposalObj = {}
        // ID
        proposalObj.id = proposal.id
        // Total Vote Weight
        // console.log('proposal', proposal.vote_counts)
        const voteCountsObj = {}
        for (const voteCount of proposal.vote_counts) {
          voteCountsObj[voteCount.key] = voteCount.value
        }
        // console.log('voteCountsObj', voteCountsObj)
        proposalObj.totalVoteWeight = voteCountsObj[0] + voteCountsObj[1] + voteCountsObj[2]
        proposalObj.allVoters = await this.getProposalVotesList(proposal.id)
        proposalObj.yourVoteWeight = 0
        for (const voter of proposalObj.allVoters) {
          if (cycleProposalsObj.votersTotalVoteWeights[voter.voter] !== undefined) {
            cycleProposalsObj.votersTotalVoteWeights[voter.voter] += voter.weight
          } else {
            cycleProposalsObj.votersTotalVoteWeights[voter.voter] = voter.weight
          }

          if (voter.voter === accountName) {
            proposalObj.yourVoteWeight = voter.weight
          }
        }
        // console.log(proposalObj.allVoters)
        proposalObj.projectedResult = voteCountsObj[1] > voteCountsObj[2] ? '1' : '2'

        const proposalCostStr = proposal.pay[0].field_0.quantity
        proposalObj.cost = parseFloat(proposalCostStr.split(' ', 1)[0])
        proposals.push(proposalObj)

        if (proposalObj.projectedResult === '1') {
          cycleProposalsObj.totalPassingProposalCost += parseFloat(proposalObj.cost)
        }
        cycleProposalsObj.totalProposalVoteWeights += proposalObj.totalVoteWeight
        cycleProposalsObj.yourTotalProposalVoteWeights += proposalObj.yourVoteWeight
      }

      cycleProposalsObj.budgetRemaining = cycleProposalsObj.curCycleTotalBudget - cycleProposalsObj.totalPassingProposalCost
      cycleProposalsObj.unusedBudgetFeepool = cycleProposalsObj.budgetRemaining * cycleProposalsObj.unusedBudgetFeepoolPercent
      cycleProposalsObj.yourProjectedFeepoolShare = cycleProposalsObj.yourTotalProposalVoteWeights / cycleProposalsObj.totalProposalVoteWeights
      cycleProposalsObj.yourProjectedFeepoolRewards = cycleProposalsObj.yourProjectedFeepoolShare * cycleProposalsObj.unusedBudgetFeepool
      cycleProposalsObj.curCycleProposals = proposals

      cycleProposalsObj.avgProposalVoteWeight = cycleProposalsObj.totalProposalVoteWeights / cycleProposalsObj.curCycleProposals.length
      cycleProposalsObj.avgProposalVoteWeightMinusAccount = (cycleProposalsObj.totalProposalVoteWeights - cycleProposalsObj.yourTotalProposalVoteWeights) / cycleProposalsObj.curCycleProposals.length
      return cycleProposalsObj
    },
    setCurrStakedInfo () {
      this.curr_stakeEFX = parseFloat(this.$wallet.efxStaked)
      this.curr_stakeNFX = parseFloat(this.$wallet.nfxStaked)
      this.curr_EP = parseFloat(this.$wallet.power)
      this.curr_stakeAge = parseFloat(this.$wallet.stakeAge)
      this.curr_voteweight = parseFloat(this.$wallet.calculateVotePower(this.curr_EP, this.curr_stakeNFX))

      this.setCalcStakedInfo()
    },
    setCalcStakedInfo () {
      const inputStakeEFX = Number.isInteger(parseFloat(this.custom_stakeEFX)) ? parseFloat(this.custom_stakeEFX) : 0
      const inputUnstakeEFX = Number.isInteger(parseFloat(this.custom_unstakeEFX)) ? parseFloat(this.custom_unstakeEFX) : 0
      const inputStakeNFX = Number.isInteger(parseFloat(this.custom_stakeNFX)) ? parseFloat(this.custom_stakeNFX) : 0
      const inputUnstakeNFX = Number.isInteger(parseFloat(this.custom_unstakeNFX)) ? parseFloat(this.custom_unstakeNFX) : 0
      const inputStakeAge = Number.isInteger(parseFloat(this.custom_stakeAge)) ? parseFloat(this.custom_stakeAge) : ''
      const inputFeepoolBonus = Number.isInteger(parseFloat(this.custom_feepool_bonus)) ? parseFloat(this.custom_feepool_bonus) : ''

      if (Number.isInteger(inputFeepoolBonus)) { this.custom_feepool_bonus = inputFeepoolBonus }
      // Stake EFX
      this.calc_stakeEFX = this.curr_stakeEFX + inputStakeEFX
      if (this.calc_stakeEFX > 0) {
        this.calc_stakeAge = this.curr_stakeAge * (this.curr_stakeEFX / this.calc_stakeEFX) / (24 * 3600)
      } else {
        this.calc_stakeAge = 0
      }
      // Unstake EFX
      this.calc_stakeEFX = this.calc_stakeEFX - inputUnstakeEFX

      if (Number.isInteger(inputStakeAge)) { this.calc_stakeAge = inputStakeAge }
      // Effect Power
      this.calc_EP = this.calc_stakeEFX + this.calc_stakeEFX * (this.calc_stakeAge / 200)

      // Stake NFX
      this.calc_stakeNFX = this.curr_stakeNFX + inputStakeNFX
      // Unstake NFX
      this.calc_stakeNFX = this.calc_stakeNFX - inputUnstakeNFX

      // Vote Weight
      this.calc_voteweight = Math.floor(Math.min(this.calc_stakeNFX, this.calc_EP / 20))
    },
    resetValues () {
      this.custom_stakeEFX = ''
      this.custom_unstakeEFX = ''
      this.custom_stakeNFX = ''
      this.custom_unstakeNFX = ''
      this.custom_stakeAge = ''
      this.curr_stakeEFX = 0
      this.curr_stakeNFX = 0
      this.curr_stakeAge = 0
      this.curr_EP = 0
      this.curr_voteweight = 0
      this.calc_stakeEFX = 0
      this.calc_stakeNFX = 0
      this.calc_stakeAge = 0
      this.calc_EP = 0
      this.calc_voteweight = 0
    },
    async getProposalVotesList (id) {
      // this.loading = true
      let votes = []

      if (this.$dao.proposalConfig) {
        try {
          const config = {
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'vote',
            index_position: 4,
            key_type: 'i64',
            limit: 1000,
            lower_bound: id,
            upper_bound: id
          }
          // if (this.nextKey) {
          //   config.lower_bound = this.nextKey
          // }
          const data = await this.$eos.rpc.get_table_rows(config)
          // this.moreVotes = data.more
          // this.nextKey = data.next_key
          votes = data.rows
          // if (!this.votes) {
          //   this.votes = data.rows
          // } else {
          //   this.votes = this.votes.concat(data.rows)
          // }
        } catch (e) {
          console.log(e)
        }
      }

      return votes
    },
    calculateFees () {
      this.totalFees = Object.values(this.balances).reduce((acc, item) => {
        if (item.balance.length > 0) {
          if (item.cycle_id === this.lastCycleId) {
            this.lastCycleTotalFees = item.balance[0].value / 10000
          }
          return acc + item.balance[0].value / 10000
        }
      }, 0)
    },
    getLastCycleUserWeight (proposalIds) {
      this.lastCycleUserWeight = 0

      if (this.accountName) {
        proposalIds.map(async (proposalId) => {
          const compositeKey = this.getCompositeKey(this.accountName, proposalId)
          const claimData = await this.$eos.rpc.get_table_rows({
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'vote',
            index_position: 2,
            key_type: 'i128',
            lower_bound: compositeKey,
            upper_bound: compositeKey
          })

          if (claimData && claimData.rows.length > 0) {
            this.lastCycleUserWeight += claimData.rows[0].weight
          }
        })
      }
    },
    bytesToHex (bytes) {
      let hex = ''
      for (const b of bytes) {
        const n = Number(b).toString(16)
        hex += (n.length === 1 ? '0' : '') + n
      }
      return hex
    },
    getCompositeKey (name, cycle) {
      const buf = new Serialize.SerialBuffer()
      buf.reserve(64)
      buf.pushName(name)
      const nameHex = this.bytesToHex(buf.getUint8Array(8)).match(/../g).reverse().join('')
      const cycleHex = this.bytesToHex(Long.fromNumber(cycle).toBytes())
      return `0x${cycleHex}${nameHex}`
    },
    getUserCycleClaim (cycleId) {
      return (this.claims[cycleId]) ? this.claims[cycleId] : 0
    }
  }
}
</script>

<style lang="scss">
table {
  font-size: 0.7em;

  .tag {
    font-size: 0.9em;
    height: inherit;
  }
}
</style>
