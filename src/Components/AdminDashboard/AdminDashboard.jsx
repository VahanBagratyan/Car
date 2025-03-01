import styles from "./adminDashboard.module.css";
import ModifyProducts from "./AdminTools/ModifyProducts/ModifyProducts";
import ModifyProductsSliders from "./AdminTools/ModifyProductsSlider/ModifyProductsSlider"
const AdminDashboard = () => {
    return (
        <div className={styles.root}>
                <ModifyProducts/>
                <ModifyProductsSliders/>
        </div>
    );

};

export default AdminDashboard;
