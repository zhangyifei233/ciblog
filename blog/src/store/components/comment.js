import axios from '@/http'
import router from '@/router'

import {
    Notification
} from 'element-ui';

export default {
    state: {
        commentList: [],
        comment: {}
    },
    mutations: {
        setCommentList(state, data) {
            state.commentList = data;
        },
        setComment(state, data) {
            state.comment = data;
        }
    },
    actions: {
        getCommentDataAction(context, data) {
            axios
                .post("/api/api/client/commentc/byid", {
                    aid: data
                })
                .then(res => {
                    context.commit('setComment', res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getCommentListAction(context) {
            axios
                .post("/api/api/client/commentc")
                .then(res => {
                    context.commit('setCommentList', res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addCommentAction(context, data) {
            axios
                .post("/api/api/client/commentc/add", {
                    data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        context.dispatch('getCommentDataAction', data.aid);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        editCommentAction(context, data) {
            axios
                .post("/api/api/client/commentc/edit", {
                    data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        router.push('/admin/manage_comment')
                        context.dispatch('getCommentListAction');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        editCommentStatusAction(context, data) {
            axios
                .post("/api/api/client/commentc/editstatus", {
                    cid: data.cid,
                    status: data.status
                })
                .then(res => {
                    context.dispatch('getCommentListAction');
                })
                .catch(err => {
                    console.log(err);
                });
        },
        delCommentAction(context, data) {
            axios
                .post("/api/api/client/commentc/del", {
                    cid: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        context.dispatch('getCommentListAction');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    modules: {}
}