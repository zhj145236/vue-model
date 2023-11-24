<template>
    <div class="login-main">
        <div class="login-main-s">
            <h3>Jeff框架搭建</h3>
            <el-form :model="ruleForm" size="default" label-width="80px">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="用户名：" prop="useName">
                            <el-input v-model="ruleForm.useName" placeholder="请输入用户名" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="密码：" prop="pasWord">
                            <el-input v-model="ruleForm.pasWord" placeholder="请输入密码" type="password" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-button style="width: 100%;background-color: #213d5b;" type="primary" @click="submitForm">登陆</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent , toRaw , toRefs , reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
interface formType {
    ruleForm: ruleFormType,
}
type ruleFormType = {
    useName: String,
    pasWord: String,
}
export default defineComponent( {
    name: 'login',
    components: {},
    setup(){
        const router = useRouter();
        /*** state 引用接口定义基础数据初始值 */
        const state = reactive < formType > ({
            ruleForm: {} as ruleFormType
        });

        const submitForm = () => {
            const FormData = toRaw(state.ruleForm);
            if(Object.keys(FormData).length !== 0){
                if(FormData.useName === 'jeff' && FormData.pasWord === '123456'){
                    ElMessage({
                        type: 'success',
                        message: '登陆成功',
                        duration: 1500,
                        onClose: () => {
                            const userInfo:any = {}
                            userInfo.token = 'jeff_sys';
                            userInfo.useName = 'jeff';
                            localStorage.setItem('userInfo',JSON.stringify(userInfo));
                            router.push('/home');
                        }
                    });
                }else{
                    ElMessage({
                        type: 'warning',
                        message: '用户名或密码错误',
                        duration: 2000,
                    })
                }
            }else{
                ElMessage({
                    type: 'warning',
                    message: '请输入用户名或密码',
                    duration: 2000,
                })
            }
        }
        return {
            ...toRefs(state),
            submitForm,
        }
    },
} )
</script>
<style scoped lang="scss">
    .login-main{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-image: url('@/assets/images/bjFour.jpeg');
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        h3{
            text-align: left;
            color: #424243;
            margin-top: 0;
        }
        .login-main-s{
            background-color: #E5EAF3;
            width: 40%;
            margin: auto;
            padding: 30px 20px;
        }
    }
</style>