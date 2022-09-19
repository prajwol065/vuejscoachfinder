<template>
    <div>
        <section>
            <base-card>
                <h2>Register as a coach now!</h2>
                <coach-form @save-data="saveData"></coach-form>
                <p v-if="isCoach">Testing is coach</p>
                <p v-else>Testing is not coach</p>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
    components: {
        CoachForm
    },
    methods: {
        saveData(data) {
            this.$store.dispatch('coaches/registerCoach', data);
            this.$router.replace('/coaches'); //navigating away and also doesn't allow us to go back to the form page
        }
    },
  /*  async mounted(){
    await this.$store.dispatch('coaches/loadCoaches', { foreceRefresh: true });
        console.log('is a coach', this.$store.getters['coaches/isCoach']);
        if(this.$store.getters['coaches/isCoach']){
            this.$router.replace('/coaches');
        }
    }, */
    computed:{
        isCoach(){
            return this.$store.getters['coaches/isCoach'];
        }
    }
}
</script>