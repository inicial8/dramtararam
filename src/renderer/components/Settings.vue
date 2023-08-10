<!-- eslint-disable max-len -->
<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="command"
          color="success"
          :loading="loading"
          label="Command"
        />
        <v-btn text @click="run">
          Run
        </v-btn>
        <v-textarea
          v-model="stdout"
          name="input-7-1"
          label="Result"
          value=""
          hint="The result of your command"
          :rows="10"
        />
        <v-chip
          v-show="err"
          color="red"
          text-color="white"
        >
          {{ err }}
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { exec } from 'child_process'

export default {
  name: 'ShellExec',
  components: {},
  data () {
    return {
      err: '',
      stdout: '',
      stderr: '',
      command: '',
      loading: false
    }
  },
  methods: {
    run () {
      this.stdout = ''
      this.err = ''
      this.loading = true
      exec(this.command, (err, stdout) => {
        if (err) {
          this.err = err
          this.loading = false
        } else {
          for (const line of stdout) {
            this.stdout += `${line}`
            this.loading = false
          }
        }
      })
    }
  }

}
</script>
