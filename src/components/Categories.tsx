import { Table, Tag, Button, Input, Select, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { addCategory, getCategories } from '../store/actions/categoryActions';
import { Category, CategoryForm } from '../types/category';
import { SketchPicker } from 'react-color';

type Mode = "new" | "edit";


const emptyForm: CategoryForm = {
    name: "",
    type: "expense",
    color: "black"
}

function Categories() {

    const { data, loading, error } = useSelector((state: AppState) => state.categories)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mode, setMode] = useState<Mode>("new")
    const [form, setForm] = useState<CategoryForm>(emptyForm)

    const showModal = (mode: Mode) => {
        setIsModalVisible(true);
        setMode(mode)
    };

    const handleOk = () => {
        // mode değerine göre create veya update action fonksiyonunu çağırır
        dispatch(addCategory(form))
        setIsModalVisible(false);
        setMode("new");
        setForm(emptyForm)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setMode("new")
        setForm(emptyForm)
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text: string, category: Category) => {
                return <Tag color={category.color}> {text.toUpperCase()}</ Tag>

            },
        }
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    return (
        <>
            <div>
                <Button type='primary' onClick={() => showModal("new")}>
                    New Category
                </Button>
                <Modal okButtonProps={{ disabled: !form.name }} title={mode === "new" ? "Create New Category" : "Update Category"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Form.Item label="Category Name">
                            <Input
                                name="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Category Type">
                            <Select
                                defaultValue="expense"
                                value={form.type}
                                onChange={(type) => setForm({ ...form, type })}
                            >
                                <Select.Option value="income">Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Color">
                            <SketchPicker
                                color={form.color}
                                onChange={(color) => setForm({ ...form, color: color.hex })}
                            />
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
            <Table columns={columns} dataSource={data} />
        </>
    )


}

export default Categories;
