<template>
  <div class="min-h-screen container mx-auto py-4 bg-grey-100" style="max-width: 910px;">

    <h2 class="mt-20 text-center text-3xl font-extrabold text-gray-900">
      IP 位址資訊查詢
    </h2>
  
    <div class="mt-10 border bg-white rounded-xl shadow-lg">
      <div class="px-4 py-5 space-y-6 sm:p-6">
        <div class="mt-1">
          <div class="font-bold text-xl mb-2">查詢</div>
          <input
            v-model="searchString"
            @keyup.enter="query"
            class="mt-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            type="text"
            name="link"
            id="link"
            autocomplete="off"
            placeholder="貼上 IP 位址，例如： 216.58.200.46"
          />
        </div>

        <p v-if="cacheString.length !== 0" class="mt-2 text-sm text-gray-500">
          現在查詢的 IP 是： {{ cacheString }}
        </p>

        <p class="text-sm text-gray-500">
          查詢任何 IP 位址，並顯示 IP 位址的結果
        </p>
      </div>
    </div>

    <!-- button -->
    <div class="mt-5">
      <button @click="query" class="w-full flex flex-row justify-center items-center p-3 bg-indigo-900 text-white rounded-lg shadow-lg focus:outline-none active:bg-indigo-800 disabled:opacity-80" type="button" :disabled="loading">

        <template v-if="loading">
          <spinner />
          <span>查詢中...</span>
        </template>

        <span v-else>查詢</span>
      </button>
    </div>
    
    <!-- result -->
    <template v-if="!loading">
      <div
        v-if="resultInfo.success === false"
        class="mt-10 p-3 border border-red-300 bg-red-100 rounded-xl shadow-xl"
      >
        <div class="px-4 py-5">
          <div class="font-bold text-red-900 text-2xl">查詢錯誤</div>

          <p class="mt-4">{{ resultInfo.message }}</p>
        </div>
      </div>
    
      <div v-else class="mt-10 p-3 border bg-white rounded-xl shadow-xl">
        <div class="px-4 py-5">
          <div class="font-bold text-green-900 text-3xl">一般資訊</div>

          <div class="mt-3 grid grid-cols-1 sm:grid-cols-12">
            <div class="col-span-6">
              <div class="text-lg font-bold text-green-900">IP 位址</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.ip }}</div>
            </div>

            <div class="col-span-6">
              <div class="text-lg font-bold text-green-900">網際協定版本</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.type }}</div>
            </div>
          </div>




          <div class="mt-10 font-bold text-green-900 text-3xl">地理位置</div>

          <div class="mt-3 grid grid-cols-1 sm:grid-cols-12">
            <div class="col-span-6">
              <div class="text-lg font-bold text-green-900">緯度</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.latitude }}</div>
            </div>

            <div class="col-span-6">
              <div class="text-lg font-bold text-green-900">經度</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.longitude }}</div>
            </div>
          </div>

          <div class="mt-5 grid grid-cols-1 sm:grid-cols-12">
            <div class="col-span-4">
              <div class="text-lg font-bold text-green-900">地區</div>
              <div class="text-2xl font-bold text-red-800">
                <img class="rounded-md" :src="resultInfo.country_flag" width="68" height="48" />
                {{ resultInfo.country }}, {{ resultInfo.country_code }}
              </div>
            </div>

            <div class="col-span-4">
              <div class="text-lg font-bold text-green-900">城市</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.city }}</div>
            </div>

            <div class="col-span-4">
              <div class="text-lg font-bold text-green-900">國際電話區號</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.country_phone }}</div>
            </div>
          </div>



          <div class="mt-10 font-bold text-green-900 text-3xl">時區資訊</div>

          <div class="mt-3 text-lg font-bold text-green-900">時區</div>
          <div class="text-2xl font-bold text-red-800">{{ resultInfo.timezone }}</div>

          <div class="mt-5 text-lg font-bold text-green-900">時區名稱</div>
          <div class="text-2xl font-bold text-red-800">{{ resultInfo.timezone_name }}</div>

          <div class="mt-5 grid grid-cols-1 sm:grid-cols-12">
            <div class="col-span-6">
              <div class="text-lg font-bold text-green-900">GMT 時區</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.timezone_gmt }}</div>
            </div>

            <div class="col-span-6">
              <div class="text-lg font-bold text-green-900">GMT 時區偏移</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.timezone_gmtOffset }}</div>
            </div>
          </div>



          <div class="mt-10 font-bold text-green-900 text-3xl">ISP 資訊</div>
    
          <div class="mt-5 text-lg font-bold text-green-900">ASN</div>
          <div class="text-2xl font-bold text-red-800">{{ resultInfo.longitude }}</div>

          <div class="mt-5 text-lg font-bold text-green-900">ORG</div>
          <div class="text-2xl font-bold text-red-800">{{ resultInfo.org }}</div>
          
          <div class="mt-5 text-lg font-bold text-green-900">網路供應商</div>
          <div class="text-2xl font-bold text-red-800">{{ resultInfo.isp }}</div>
          
          
          
          <div class="mt-10 font-bold text-green-900 text-3xl">貨幣資訊</div>

          <div class="mt-5 grid grid-cols-1 sm:grid-cols-12">
            <div class="col-span-4">
              <div class="text-lg font-bold text-green-900">貨幣</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.currency }}</div>
            </div>

            <div class="col-span-4">
              <div class="text-lg font-bold text-green-900">貨幣代碼</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.currency_code }}</div>
            </div>

            <div class="col-span-4">
              <div class="text-lg font-bold text-green-900">貨幣符號</div>
              <div class="text-2xl font-bold text-red-800">{{ resultInfo.currency_symbol }}</div>
            </div>
          </div>

          <div class="mt-5 text-lg font-bold text-green-900">匯率 USD to</div>
          <div class="text-2xl font-bold text-red-800">{{ resultInfo.currency_rates }}</div>

          <div class="mt-10 text-lg font-bold text-green-900">已完成的查詢次數</div>
          <div class="text-2xl font-bold text-red-800">{{ resultInfo.completed_requests }}</div>

        </div>
      </div>
    </template>

    <!-- footer -->
    <vFooter/>

  </div>
</template>



<script>
import axios from 'axios'
import spinner from '@/components/spinner.vue'
import vFooter from '@/components/Footer.vue'

export default {
  name: 'App',

  components: {
    spinner,
    vFooter
  },

  data: () => ({
    error: false,
    loading: true,
    searchString: '',
    cacheString: '',
  
    resultInfo: []
  }),

  methods: {
    async query() {
      let searchString = this.searchString

      if(searchString.length !== 0) {
        this.cacheString = searchString
        this.loading = true

        axios.get(`http://ipwhois.app/json/${searchString}?lang=en`)
        .then((res) => {
          this.resultInfo = res.data
          this.$router.push({path:'/',
            query: {
              ip: this.cacheString
            }
          })

          this.loading = false
        })
        .catch(() => {
          this.error = true
        })
      }
    }
  },

  mounted() {
    let urlQueryIps = this.$route.query.ip

    if(urlQueryIps !== undefined && urlQueryIps.length !==0) {
      axios.get(`http://ipwhois.app/json/${urlQueryIps}`)
      .then((res) => {
        this.resultInfo = res.data
        this.cacheString = res.data.ip

        this.loading = false
      })
      .catch(() => {
        this.error = true
      })
    } else {
      axios.get(`http://ipwhois.app/json/`)
      .then((res) => {
        this.resultInfo = res.data
        this.cacheString = res.data.ip

        this.$router.push({path:'/',
          query: {
            ip: this.cacheString
          }
        })

        this.loading = false
      })
      .catch(() => {
        this.error = true
      })
    }

  }
}
</script>

<style>
#app {
  background-color: #f9f8f2
}
</style>