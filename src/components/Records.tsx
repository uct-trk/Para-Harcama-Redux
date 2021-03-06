import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Input, Select, Space, Table, Tag, Form, Modal } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store"
import { getCategories } from "../store/actions/categoryActions"
import { addRecord, deleteRecord, getRecords, updateRecord } from "../store/actions/recordActions"
import { Category } from "../types/category"
import { Mode } from "../types/general"
import { Record, RecordForm } from "../types/record"

const emptyForm: RecordForm = {
    title: "",
    amount: 0,
    category_id: 0
}

const Records = () => {
    const { data, loading } = useSelector((state: AppState) => state.records)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mode, setMode] = useState<Mode>("new")
    const [form, setForm] = useState<RecordForm>(emptyForm)
    const [updateId, setUpdateId] = useState<number | null>(null)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const { data: categories } = useSelector((state: AppState) => state.categories)

    const showModal = (mode: Mode) => {
        setIsModalVisible(true);
        setMode(mode)
    };

    const handleOk = () => {
        if (mode === "new") dispatch(addRecord(form))
        else if (mode === "edit" && typeof updateId === 'number') dispatch(updateRecord(form, updateId))
        else if (mode === "delete" && typeof deleteId === "number") dispatch(deleteRecord(deleteId))
        setIsModalVisible(false);
        setMode("new");
        setForm(emptyForm)
        setUpdateId(null)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setMode("new")
        setForm(emptyForm)
        setUpdateId(null)
        setDeleteId(null)
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: Record['amount'], record: Record) => {
                return <>{Intl.NumberFormat('tr-TR', {
                    style: "currency",
                    currency: "TRY",
                }).format(amount)}</>
            },
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category: Category, record: Record) => {
                return <Tag color={category.color}> {category.name.toUpperCase()}</ Tag>
            }
        },
        {
            title: "Last Update",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt: string, record: Record) => {
                return <>{new Date(updatedAt).toLocaleDateString()} / {new Date(updatedAt).toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit"
                })}</>
            }
        },
        {
            title: "Action",
            key: "action",
            render: (text: string, record: Record) => {
                const { title, amount } = record;
                const category_id = record.category.id;
                return (
                    <Space size="middle">
                        <EditOutlined style={{ color: "#0390fc" }} onClick={() => {
                            showModal('edit')
                            setForm({ title, amount, category_id })
                            setUpdateId(record.id)
                        }} />
                        <DeleteOutlined style={{ color: "#c20808" }} onClick={() => {
                            showModal("delete")
                            setDeleteId(record.id)
                        }} />
                    </Space>
                )
            }
        }
    ];

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecords())
        !categories.length && dispatch(getCategories())
    }, [])

    const isFormValid = !(!form.title || form.amount === 0 || form.category_id === 0);

    return (
        <>
            <div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <Button type='primary' onClick={() => { showModal("new") }}>
                        New Record
                    </Button>
                </div>
                <Modal
                    okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
                    title={mode === "new" ? "Create New Record" : mode === "edit" ? "Update Record" : "Delete Record"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}>

                    {mode === "edit" || mode === "new" ?
                        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                            <Form.Item label="Record Title">
                                <Input
                                    name="title"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                            </Form.Item>
                            <Form.Item label="Amount">
                                <Input
                                    name="amount"
                                    value={form.amount}
                                    type="number"
                                    onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                                />
                            </Form.Item>
                            <Form.Item label="Category">
                                <Select
                                    defaultValue={form.category_id}
                                    value={form.category_id}
                                    onChange={(category_id) => setForm({ ...form, category_id })}
                                >
                                    <Select.Option value={0} disabled>Select a category</Select.Option>
                                    {categories.map(category => {
                                        return <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>

                        </Form>
                        : mode === "delete" ? <div>Are you sure ?</div> : null}

                </Modal>
            </div>
            <Table loading={loading} columns={columns} dataSource={data} rowKey="id" />
        </>
    )
}

export default Records
