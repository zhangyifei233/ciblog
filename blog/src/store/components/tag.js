import axios from 'axios'
import router from '@/router'

import {
    Notification
} from 'element-ui';

export default {
    state: {
        tagList: []
    },
    mutations: {
        setTagData(state, data) {
            state.tagList = data;
        }
    },
    actions: {
        getTagListAction(context) {
            axios
                .post("/api/api/client/tag")
                .then(res => {
                    context.commit('setTagData', res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        delTagAction(context, data) {
            axios
                .post("/api/api/client/tag/del", {
                    mid: data,
                })
                .then(res => {
                    if (res.data.code == 200) {
                        context.dispatch('getTagListAction');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addTagAction(context, data) {
            axios
                .post("/api/api/client/tag/add", {
                    name: data,
                })
                .then(res => {
                    if (res.data.code == 200) {
                        // router.push('/admin/manage_category')
                        context.dispatch('getTagListAction');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    modules: {}
}