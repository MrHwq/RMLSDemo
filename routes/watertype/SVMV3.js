/**
 * Created by weiqiang on 2017/4/27.
 */
/*
 * {__meta:{schema_version:3,schema_name:SVMV3,schema_type:SVM},
 *  _exclude_fields:null,
 * job:{__meta:{schema_version:3,schema_name:JobV3,schema_type:Job},
 *      key:{__meta:{schema_version:3,schema_name:JobKeyV3,schema_type:Key<Job>},
 *      name:$0300ffffffff$_8488829163c7c8aea8bdefdec4854dbf,type:Key<Job>,URL:/3/Jobs/$0300ffffffff$_8488829163c7c8aea8bdefdec4854dbf},
 *      description:SVM,
 *      status:RUNNING,
 *      progress:0.0,
 *      progress_msg:null,start_time:1493192273497,msec:2,
 *      dest:{
 *          __meta:{schema_version:3,schema_name:ModelKeyV3,schema_type:Key<Model>},
 *          name:SVM_81064_64294_13097,type:Key<Model>,
 *          URL:/3/Models/SVM_81064_64294_13097
 *      },
 *      warnings:null,exception:null,stacktrace:null,ready_for_view:true
 * },

 * algo:svm,
 * algo_full_name:Support Vector Machine (*Spark*),
 * can_build:[Binomial,Regression],
 * visibility:Stable,supervised:true,messages:[],
 * error_count:0,
 * parameters:[
 *      {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},
 *      name:model_id,
 *      label:model_id,
 *      help:Destination id for this model; auto-generated if not specified.,
 *      required:false,
 *      type:Key<Model>,
 *      default_value:null,
 *      actual_value:
 *      {__meta:{schema_version:3,schema_name:ModelKeyV3,schema_type:Key<Model>},
 *      name:SVM_81064_64294_13097,
 *       type:Key<Model>,
 *      URL:/3/Models/SVM_81064_64294_13097},
 *      level:critical,
 *      values:[],
 *      is_member_of_frames:[],
 *      is_mutually_exclusive_with:[],
 *      gridable:false},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:training_frame,label:training_frame,help:Id of the training data frame (Not required, to allow initial validation of model parameters).,required:false,type:Key<Frame>,default_value:null,actual_value:null,level:critical,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:false},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:response_column,label:response_column,help:Response variable column.,required:false,type:VecSpecifier,default_value:null,actual_value:{__meta:{schema_version:3,schema_name:ColSpecifierV3,schema_type:VecSpecifier},column_name:label,is_member_of_frames:null},level:critical,values:[],is_member_of_frames:[training_frame,validation_frame],is_mutually_exclusive_with:[ignored_columns],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:initial_weights_frame,label:initial_weights_frame,help:Initial model weights.,required:false,type:Key<Frame>,default_value:null,actual_value:null,level:critical,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:validation_frame,label:validation_frame,help:Id of the validation data frame.,required:false,type:Key<Frame>,default_value:null,actual_value:null,level:critical,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:nfolds,label:nfolds,help:Number of folds for N-fold cross-validation (0 to disable or >= 2).,required:false,type:int,default_value:0,actual_value:0,level:critical,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:false},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:add_intercept,label:add_intercept,help:Add intercept.,required:false,type:boolean,default_value:false,actual_value:false,level:expert,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:step_size,label:step_size,help:Set step size,required:false,type:double,default_value:1.0,actual_value:1.0,level:expert,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:reg_param,label:reg_param,help:Set regularization parameter,required:false,type:double,default_value:0.01,actual_value:0.01,level:expert,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:convergence_tol,label:convergence_tol,help:Set convergence tolerance,required:false,type:double,default_value:0.001,actual_value:0.001,level:expert,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:mini_batch_fraction,label:mini_batch_fraction,help:Set mini batch fraction,required:false,type:double,default_value:1.0,actual_value:1.0,level:expert,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:threshold,label:threshold,help:Set threshold that separates positive predictions from negative ones. NaN for raw prediction.,required:false,type:double,default_value:0.0,actual_value:0.0,level:expert,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:updater,label:updater,help:Set the updater for SGD.,required:true,type:enum,default_value:L2,actual_value:L2,level:expert,values:[L2,L1,Simple],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:gradient,label:gradient,help:Set the gradient computation type for SGD.,required:true,type:enum,default_value:Hinge,actual_value:Hinge,level:expert,values:[Hinge,LeastSquares,Logistic],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:ignored_columns,label:ignored_columns,help:Names of columns to ignore for training.,required:false,type:string[],default_value:null,actual_value:null,level:critical,values:[],is_member_of_frames:[training_frame,validation_frame],is_mutually_exclusive_with:[response_column],gridable:false},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:ignore_const_cols,label:ignore_const_cols,help:Ignore constant columns.,required:false,type:boolean,default_value:true,actual_value:true,level:critical,values:[],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:false},
 *       {__meta:{schema_version:3,schema_name:ModelParameterSchemaV3,schema_type:Iced},name:missing_values_handling,label:missing_values_handling,help:Handling of missing values. Either NotAllowed, Skip or MeanImputation.,required:false,type:enum,default_value:MeanImputation,actual_value:MeanImputation,level:expert,values:[NotAllowed,Skip,MeanImputation],is_member_of_frames:[],is_mutually_exclusive_with:[],gridable:true}]}
 */
var JobV3 = require('./JobV3')
class SVMV3 {
    constructor(svm) {
        this.job = new JobV3(svm.job);
    }

    getJob() {
        return this.job;
    }
}

module.exports = SVMV3;