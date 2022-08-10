import { reactive, Ref, watch } from 'vue';

export function createRequest<paramType>(
  parameter: Ref<paramType>,
  fn: (param: Ref<paramType>) => Promise<any>,
) {
  const result = reactive({
    loading: true,
    data: null as any,
    error: null,
  });

  const execute = (params: Ref<paramType>) => {
    result.loading = true;
    result.error = null;
    fn(params).then(res => {
      result.loading = false;
      result.data = res;
    });
  };

  watch(parameter, value => execute(parameter), { deep: true });

  execute(parameter);

  return result;
}
